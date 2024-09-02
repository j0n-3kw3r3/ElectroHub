import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { getBusinessAuthInfo, getCartInfo } from "./utils/local_storage.js";
import { loginFailed, loginSuccess } from "./redux/auth.js";
import { clearCart, storeCart } from "./redux/cartSlice.js";
import { Auth0Provider } from "@auth0/auth0-react";

let catInfo = getCartInfo();
if (catInfo && Object.keys(catInfo).length) {
  store.dispatch(storeCart(catInfo));
} else {
  store.dispatch(clearCart());
}

let businessAuthInfo = getBusinessAuthInfo();
if (businessAuthInfo && Object.keys(businessAuthInfo).length) {
  store.dispatch(loginSuccess(businessAuthInfo));
} else {
  store.dispatch(loginFailed());
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience:`http://localhost:8000`,
          scope:"openId profile email",
        }}
      
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </NextUIProvider>
  </React.StrictMode>
);
