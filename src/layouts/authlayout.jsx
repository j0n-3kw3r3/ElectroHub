import { Outlet } from "react-router-dom";
import Nav from "../components/home/navbar";
import Footer from "../components/home/footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col " >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
