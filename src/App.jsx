import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterComponent from "./config/router";

export default function App() {
  return (
    <>
      <ToastContainer position="bottom-center" />
      <RouterComponent />
    </>
  );
}
