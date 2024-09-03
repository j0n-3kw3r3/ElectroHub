import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterComponent from "./config/router";
import Home from "./pages/home";
import { useSelector } from "react-redux";

export default function App() {
  
  const admin = useSelector((state) => state.auth.role); 
  return (
    <>
      <ToastContainer position="bottom-center" />
      <RouterComponent admin={admin} />
    </>
  );
}
