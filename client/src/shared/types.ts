export type Item = {
  id: number;
  attributes: {
    name: string;
    price: number;
    longDescription: string;
    shortDescription: string;
    category: string;
    image: {
      data: {
        id: number;
        attributes: {
          formats: {
            medium: {
              url: string;
            };
            small: {
              url: string;
            };
            thumbnail: {
              url: string;
            };
          };
        };
      };
    };
  };
};

export type CartItem = {
  item: Item;
  count: number;
};
