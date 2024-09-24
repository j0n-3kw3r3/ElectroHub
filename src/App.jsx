import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterComponent from "./config/router";
import Home from "./pages/home";
import { useSelector } from "react-redux";

export default function App() {
  
  const user = useSelector((state) => state.auth); 
  return (
    <div className="bg-[#fbf9fc]">
      <ToastContainer position="top-right" />
      <RouterComponent user={user} />
    </div>
  );
}
