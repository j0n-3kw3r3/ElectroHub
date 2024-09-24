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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </NextUIProvider>
  </React.StrictMode>
);
