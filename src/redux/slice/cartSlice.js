import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, {
          positon: "top-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} product added to cart`, {
          positon: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
