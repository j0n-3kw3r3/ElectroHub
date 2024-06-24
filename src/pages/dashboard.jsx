import React, { useState } from "react";
import logo from "../assets/image/logo.svg";
import { DashbordProducts } from "../components/dashboard/DashbordProducts";
import { DashboardUsersTable } from "../components/dashboard/DashboardUsersTable";
import { DashboardTab } from "../components/dashboard/DashboardTab";
import { DashboardOrders } from "../components/dashboard/DashboardOrders";
import { Header } from "../components/dashboard/DashboardHeader";
import { DashboardMerchantsTable } from "../components/dashboard/DashboardMerchantTable";
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaStore, FaUserFriends } from "react-icons/fa";
import {
  BuildingStorefrontIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard Overview");
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [usersSubTab, setUsersSubTab] = useState("Customers");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard Overview":
        return <DashboardTab />;
      case "Products":
        return <DashbordProducts />;
      case "Orders":
        return <DashboardOrders />;
      case "Users":
        // If you want to keep the Users table as the default view when "Users" is clicked, you can leave this case as is.

        switch (usersSubTab) {
          case "Merchants":
            return <DashboardMerchantsTable />;
          case "Customers":
            // Assuming you have a component for displaying customers
            return <DashboardUsersTable />;
          default:
            return <div>Welcome to the Dashboard</div>;
        }

      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 shadow border-r text-default-800 p-5">
        <div className="mb-10">
          <img src={logo} alt="Logo" className="w-36 h-auto mx-auto" />
        </div>
        <div>
          {[
            { name: "Dashboard Overview", icon: <Squares2X2Icon className="size-4 " /> },
            { name: "Products", icon: <ShoppingBagIcon className="size-4 " /> },
            { name: "Orders", icon: <ShoppingCartIcon className="size-4 " /> },
            { name: "Users", icon: <UserGroupIcon className="size-4 " /> },
          ].map((item) => (
            <div
              key={item.name}
              className={`${
                activeTab.includes(item.name) || (item.name === "Users" && showUsersDropdown)
                  ? "bg-primary text-white "
                  : "hover:bg-primary/80 hover:text-white "
              } items-center cursor-pointer p-4 my-2 rounded  text-sm font-medium  `}
              onClick={() => {
                setActiveTab(item.name);
                if (item.name === "Users") {
                  setShowUsersDropdown(!showUsersDropdown);
                } else {
                  setShowUsersDropdown(false);
                }
              }}
            >
              <div className="flex items-center">
                {item?.icon}
                <span className="ml-2">{item.name === "Dashboard Overview" ? "Dashboard" : item.name}</span>
              </div>
              <div className="">
                {item.name === "Users" && (
                  <ul className={`mt-2  ${showUsersDropdown ? "block" : "hidden"}`}>
                    <li
                      className={`cursor-pointer p-2 my-1 rounded flex gap-2 items-center text-sm font-medium  ${
                        usersSubTab === "Merchants"
                          ? "hover:bg-primary bg-primary hover:text-white "
                          : " bg-secondary text-white "
                      }`}
                      onClick={() => setUsersSubTab("Merchants")}
                    >
                      <BuildingStorefrontIcon className="size-4 " />
                      Merchants
                    </li>
                    <li
                      className={`cursor-pointer flex p-2 my-1 rounded items-center gap-2  text-sm font-medium hover:bg-primary ${
                        usersSubTab === "Customers" ? "hover:bg-primary bg-primary " : "bg-secondary "
                      }`}
                      onClick={() => setUsersSubTab("Customers")}
                    >
                      <UsersIcon className="size-4" />
                      Customers
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>
      <div className="flex-1 overflow-y-auto  relative ">
        <Header />
        <main className="p-4">
          <h2 className="text-2xl font-semibold  ">{activeTab === "Users" ? usersSubTab : activeTab}</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
