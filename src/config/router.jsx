import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, inAppRoutes } from "./routes";
import AuthLayout from "../layouts/authlayout";
import Applayout from "../layouts/applayout";
import Page404 from "../pages/page404";
import Dashboard from "../pages/dashboard";

const renderRoutes = (layout, routes, admin) => (
  <Routes>
    <Route element={layout}>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Route>
    <Route path="*" element={<Page404 />} />
   
    <Route path="/dashboard" element={admin !== "admin" ? <Navigate to="/" replace={true} /> : <Dashboard />} />
  </Routes>
);

const RouterComponent = ({ admin }) => {
  return (
    <Router>
      <Routes>
        <Route path="auth/*" element={renderRoutes(<AuthLayout />, authRoutes)} />
        <Route path="/*" element={renderRoutes(<Applayout />, inAppRoutes, admin)} />
       
      </Routes>
    </Router>
  );
};

export default RouterComponent;
