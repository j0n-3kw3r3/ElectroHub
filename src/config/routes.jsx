import Home from "../pages/home";
import Product from "../pages/product";

const authRoutes = [
  // {path: '/login', element: <Login />},
  // {path: '/forgot-pin', element: <ForgotPin />},
  // {path: '/reset-pin', element: <ResetPin />},
  // {path: '/create-account', element: <CreateAccount />},
  // {path: '/login-as-guest', element: <LoginAsGuest />},
  // {path: '/verify-account', element: <VerifyAccount />},
  // {path: '/verify-details', element: <VerifyDetails />},
  // {path: '/reset-pin-successful', element: <ResetPinSuccessful />},
];

const inAppRoutes = [
  { path: "/", element: <Home /> },
  { path: "/product/:id", element: <Product /> },
];
export { authRoutes, inAppRoutes };
