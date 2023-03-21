import { BASE_URLS } from "@/shared/base_urls";
import { Item } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type StrapiResponse = {
  data: Item[];
  meta: any;
};

export const useFetchProductsByFiltering = (
  filterString: string,
  { enabled = true }
) => {
  const query = useQuery<StrapiResponse, Error>({
    queryKey: ["products", filterString],
    queryFn: () =>
      axios
        .get(`${BASE_URLS.STRAPI_API}/products?${filterString}&populate=image`)
        .then((response) => response.data),
    enabled: enabled,
  });

  return query;
};
