import React from "react";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RouterComponent from "./config/router";

export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterComponent />
    </Provider>
  );
}
