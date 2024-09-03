import { Outlet } from "react-router-dom";
import Nav from "../components/home/navbar";
import Footer from "../components/home/footer";
import { useState } from "react";

const Applayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const darkModdeToggle = () => {
    setDarkMode(!darkMode);
  };
  return (
    // <ProtectedRoute>
    <div className={`flex flex-col ${darkMode && "dark"} `}>
      <Nav onClick={darkModdeToggle} darkMode={darkMode} />
      <Outlet />
      <Footer />
    </div>
    // </ProtectedRoute>
  );
};

export default Applayout;
