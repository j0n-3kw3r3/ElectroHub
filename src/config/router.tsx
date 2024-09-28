import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, inAppRoutes } from "./routes";
import AuthLayout from "../layouts/authlayout";
import Applayout from "../layouts/applayout";
import Page404 from "../pages/page404";
import Dashboard from "../pages/dashboard";
import Checkout from "../pages/checkout";
import Profile from "../pages/profile";
import EditProfile from "../pages/editprofile";

import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";

const renderRoutes = (layout: ReactElement, routes: RouteObject[], user: any) => (
  <Routes>
    <Route element={layout}>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Route>
    <Route path="*" element={<Page404 />} />
   
    <Route path="/dashboard" element={user?.role !== "admin" ? <Navigate to="/" replace={true} /> : <Dashboard />} />
    <Route path="/checkout" element={user?.id ? <Checkout/> :<Navigate to="/auth/login" replace={true} />} />
    <Route path="/my-account" element={user?.id ? <Profile/> :<Navigate to="/auth/login" replace={true} />} />
    <Route path="/my-account/edit" element={user?.id ? <EditProfile/> :<Navigate to="/auth/login" replace={true} />} />
  </Routes>
);

const RouterComponent = ({ user }:any) => {
  return (
    <Router>
      <Routes>
        <Route path="auth/*" element={renderRoutes(<AuthLayout />, authRoutes, user)} />
        <Route path="/*" element={renderRoutes(<Applayout />, inAppRoutes, user)} />
       
      </Routes>
    </Router>
  );
};

export default RouterComponent;
