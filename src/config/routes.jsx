import AboutUs from "../pages/about";
import ContactUs from "../pages/contact";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Login from "../pages/login";
import Product from "../pages/product";
import SearchResult from "../pages/search";
import Signup from "../pages/signup";

const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

const inAppRoutes = [
  { path: "/", element: <Home /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/search", element: <SearchResult /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/contact-us", element: <ContactUs /> },
];
export { authRoutes, inAppRoutes };
