import { createSlice } from "@reduxjs/toolkit";
import { clearBusinessAuthInfo, storeBusinessAuthInfo } from "../utils/local_storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    isEmailVerified: false,
    role: null,
    profilePicture: null,
    id: null,
    name: null,
    email: null,
    address: null,
    phoneNumber: null,
    likes: null,
    dateOfBirth: null,
    wishlist: null,
    cart: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      let payload = action.payload;

      state.isAuthenticated = true;
      state.token = payload?.token;
      state.email = payload.email;
      state.role = payload.role;
      state.id = payload.id;
      state.profilePicture = payload.profilePicture;
      state.name = payload.name;
      state.phoneNumber = payload.phoneNumber;
      state.isEmailVerified = payload.isEmailVerified;
      state.address = payload.address;
      state.likes = payload.likes;
      state.dateOfBirth = payload.dateOfBirth;
      state.wishlist = payload.wishlist;
      state.cart = payload.cart;
      state.isEmailVerified = payload.isEmailVerified;

      storeBusinessAuthInfo(state);
    },

    loginFailed: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.role = null;
      state.id = null;
      state.profilePicture = null;
      state.name = null;
      state.phoneNumber = null;
      state.isEmailVerified = null;
      state.address = null;
      state.likes = null;
      state.dateOfBirth = null;
      state.wishlist = null;
      state.cart = null;
      state.isEmailVerified = false;
    },

    registerSuccess: (state, action) => {
      let payload = action.payload;

      state.isAuthenticated = true;
      state.token = payload?.token;
      state.email = payload.email;
      state.role = payload.role;
      state.id = payload.id;
      state.profilePicture = payload.profilePicture;
      state.name = payload.name;
      state.phoneNumber = payload.phoneNumber;
      state.isEmailVerified = payload.isEmailVerified;
      state.address = payload.address;
      state.likes = payload.likes;
      state.dateOfBirth = payload.dateOfBirth;
      state.wishlist = payload.wishlist;
      state.cart = payload.cart;
      state.isEmailVerified = payload.isEmailVerified;

      storeBusinessAuthInfo(state);
    },

    registerFailed: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.role = null;
      state.id = null;
      state.profilePicture = null;
      state.name = null;
      state.phoneNumber = null;
      state.isEmailVerified = null;
      state.address = null;
      state.likes = null;
      state.dateOfBirth = null;
      state.wishlist = null;
      state.cart = null;
      state.isEmailVerified = false;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.role = null;
      state.id = null;
      state.profilePicture = null;
      state.name = null;
      state.phoneNumber = null;
      state.isEmailVerified = null;
      state.address = null;
      state.likes = null;
      state.dateOfBirth = null;
      state.wishlist = null;
      state.cart = null;
      state.isEmailVerified = false;

      clearBusinessAuthInfo();
    },
  },
});

export const { logout, loginSuccess, loginFailed, registerFailed, registerSuccess, updateprofilePicture } =
  authSlice.actions;

export default authSlice.reducer;
