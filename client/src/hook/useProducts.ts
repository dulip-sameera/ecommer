import { Item } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type StrapiResponse = {
  data: Item[];
  meta: any;
};

const STRAPI_BASE_URL = "http://localhost:1337/api";
export const useProducts = () => {
  const query = useQuery<StrapiResponse, Error>({
    queryKey: ["product"],
    queryFn: () =>
      axios
        .get(`${STRAPI_BASE_URL}/products?populate=image`)
        .then((response) => response.data),
  });

  return query;
};
