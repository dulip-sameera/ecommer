/**
 * order controller
 */

import { factories } from "@strapi/strapi";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    // updating the create service
    async create(ctx) {
      try {
        const { products, email, username } = ctx.request.body;

        const line_items = Promise.all(
          products.map(async (product) => {
            const item = await strapi
              .service("api::product.product")
              .findOne(product.id, {});

            return {
              // stripe line item object
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100,
              },
              quantity: product.count,
            };
          })
        );

        const stripe_session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: email,
          mode: "payment",
          success_url: "http://localhost:5173/checkout/success",
          cancel_url: "http://localhost:5173",
          line_items: line_items,
        });

        // create the order
        await strapi.service("api::order.order").create({
          data: {
            userName: username,
            products: products,
            stripeSessionId: stripe_session.id,
          },
        });

        return { id: stripe_session.id };
      } catch (error) {
        ctx.response.status = 500;

        return {
          error: { message: "There was a problem creating the charge" },
        };
      }
    },
  })
);
