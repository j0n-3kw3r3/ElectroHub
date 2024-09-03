import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Login from "../pages/login";
import Product from "../pages/product";
import Signup from "../pages/signup";

const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

const inAppRoutes = [
  { path: "/", element: <Home /> },
  { path: "/product/:id", element: <Product /> },
  // { path: "/dashboard", element: <Dashboard /> },
];
export { authRoutes, inAppRoutes };
