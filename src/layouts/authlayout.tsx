import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col " >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
