import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { loginFailed, loginSuccess } from "./redux/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { store } from "./redux/store";
import { getBusinessAuthInfo, getCartInfo } from "./utils/local_storage";
import { clearCart, storeCart } from "./redux/cartSlice";

// Create a client
const queryClient = new QueryClient();

let catInfo = getCartInfo();
if (catInfo) {
  try {
    catInfo = JSON.parse(catInfo);
  } catch (e) {
    console.error("Failed to parse cart info", e);
    catInfo = null;
  }
}

if (catInfo && typeof catInfo === 'object' && Object.keys(catInfo).length) {
  store.dispatch(storeCart(catInfo));
} else {
  store.dispatch(clearCart({}));
}

let businessAuthInfo = getBusinessAuthInfo();
if (businessAuthInfo && typeof businessAuthInfo === 'object' && Object.keys(businessAuthInfo).length) {
  store.dispatch(loginSuccess(businessAuthInfo));
} else {
  store.dispatch(loginFailed());
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
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
} else {
  console.error("Root element not found");
}
