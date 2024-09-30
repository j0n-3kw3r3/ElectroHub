import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./auth"

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
    },
})