/**
 * order controller
 */

import { factories } from "@strapi/strapi";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { products, email, username } = ctx.request.body;

        console.log("error 1");

        const line_items = await Promise.all(
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

        console.log("error 2");

        const stripe_session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: email,
          mode: "payment",
          success_url: "http://localhost:5173/checkout/success",
          cancel_url: "http://localhost:5173",
          line_items: line_items,
        });

        console.log("error 3");

        // create the order
        await strapi.service("api::order.order").create({
          data: {
            userName: username,
            products: products,
            stripeSessionId: stripe_session.id,
          },
        });

        console.log("error 4");

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
