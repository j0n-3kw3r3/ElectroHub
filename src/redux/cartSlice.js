import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
          
          const productTemplate = { ...action.payload, cartQuantity: 1 };
          state.cartItems.push(productTemplate);
        }
    },
    deleteCart: (state, action) => {},
  },
});

export const { addToCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
