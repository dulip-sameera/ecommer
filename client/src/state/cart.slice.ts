import { CartItem, Item } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const i: Item = {
  id: "",
  shortDescription: "",
  longDescription: "",
  price: 1,
  image: "",
  category: "",
};

type State = {
  isCartOpen: boolean;
  cart: CartItem[];
  items: Item[];
};

const initialState: State = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<Item>) {
      const cartItem = state.cart.find(
        (item) => item.item.id === action.payload.id
      );

      if (cartItem) {
        cartItem.count += 1;
      } else {
        state.cart.push({ item: action.payload, count: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.item.id !== action.payload);
    },
    increaseCount(state, action: PayloadAction<string>) {
      const cartItem = state.cart.find(
        (item) => item.item.id === action.payload
      );

      if (cartItem) {
        cartItem.count += 1;
      }
    },
    decreaseCount(state, action: PayloadAction<string>) {
      const cartItem = state.cart.find(
        (item) => item.item.id === action.payload
      );

      if (cartItem && cartItem.count > 1) {
        cartItem.count -= 1;
      }
    },
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;
export default cartSlice.reducer;
