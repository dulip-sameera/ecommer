export type Item = {
  id: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  item: Item;
  count: number;
};
