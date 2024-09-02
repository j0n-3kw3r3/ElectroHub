import { createSlice } from "@reduxjs/toolkit";
import { clearBusinessAuthInfo, storeBusinessAuthInfo } from "../utils/local_storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    role: null,
    picture: null,
    isEmailVerified: false,
    accessToken: null,
    uuid: null,
    name: null,
    email: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      let payload = action.payload;
      state.isAuthenticated = true;
      state.accessToken = payload.accessToken;
      state.email = payload.email;
      state.role = payload.role;
      state.uuid = payload.uuid;
      state.picture = payload.picture;
      state.name = payload.name;

      storeBusinessAuthInfo(state);
    },

    loginFailed: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.email = null;
      state.uuid = null;
      state.role = null;
      state.name = null;
    },

    registerSuccess: (state, action) => {
      let payload = action.payload;

      state.isAuthenticated = true;
      state.accessToken = payload.accessToken;
      state.email = payload.email;
      state.role = payload.role;
      state.uuid = payload.uuid;
      state.picture = payload.picture;
      state.name = payload.name;

      storeBusinessAuthInfo(state);
    },

    registerFailed: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.email = null;
      state.uuid = null;
      state.name = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.uuid = null;

      clearBusinessAuthInfo();
    },
  },
});

export const { logout, loginSuccess, loginFailed, registerFailed, registerSuccess, updatepicture } = authSlice.actions;

export default authSlice.reducer;
