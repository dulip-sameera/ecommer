import axios from "axios";
import type { Stripe } from "@stripe/stripe-js";

type Data = {
  request_body: {
    username: string;
    email: string;
    products: { id: number; count: number }[];
  };
  stripe: Stripe | null;
};

export function postOrder(data: Data) {
  return axios
    .post("http://localhost:1337/api/orders", data.request_body)
    .then((response) => response.data);
}
