import { BASE_URLS } from "@/shared/base_urls";
import { Item } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type StrapiResponse = {
  data: Item[];
  meta: any;
};

export const useProducts = () => {
  const query = useQuery<StrapiResponse, Error>({
    queryKey: ["products"],
    queryFn: () =>
      axios
        .get(`${BASE_URLS.STRAPI_API}/products?populate=image`)
        .then((response) => response.data),
  });

  return query;
};
