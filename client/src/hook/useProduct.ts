import { BASE_URLS } from "@/shared/base_urls";
import { Item } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TlsOptions } from "tls";

type StrapiResponse = {
  data: Item;
  meta: any;
};

export const useProduct = (id: string) => {
  if (id === "")
    return {
      data: undefined,
      meta: undefined,
      isLoading: false,
      isError: false,
      error: undefined,
    };
  const query = useQuery<StrapiResponse, Error>({
    queryKey: ["product", id],
    queryFn: () =>
      axios
        .get(`${BASE_URLS.STRAPI_API}/products/${id}?populate=image`)
        .then((response) => response.data),
  });

  return query;
};
