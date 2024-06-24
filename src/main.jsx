import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { getCartInfo } from "./utils/local_storage.js";
import { clearCart, storeCart } from "./redux/cartSlice.js";

let catInfo = getCartInfo();
if (catInfo && Object.keys(catInfo).length) {
  store.dispatch(storeCart(catInfo));
} else {
  store.dispatch(clearCart());
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
