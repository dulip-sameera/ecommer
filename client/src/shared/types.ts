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

export type CheckoutFormInitialValues = {
  billingInformation: {
    firstName: string;
    lastName: string;
    country: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shippingInformation: {
    isSameAddress: boolean;
    firstName: string;
    lastName: string;
    country: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
  };

  email: string;
  phoneNumber: string;
};
