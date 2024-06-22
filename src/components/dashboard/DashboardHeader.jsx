import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

// header component
export const Header = () => {
  return (
    <header className="bg-white  shadow text-default-600 z-50 sticky w-full top-0 flex justify-between items-center p-4">
      <div className="flex items-center">
        {/* Brand Name */}
        <span className="text-xl font-bold">Admin Dashboard</span>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="mr-4 p-2 rounded-lg bg-default-600/10 border-none text-default-600 placeholder-default-600/70  focus:outline-none transition duration-150 ease-in-out"
          style={{ backdropFilter: "blur(5px)" }}
        />
        {/* Search Bar */}
        <button className="mr-4">
          <BellIcon className="size-5" />
        </button>
        <div className="flex items-center cursor-pointer">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-8 h-8 rounded-full mr-2" />{" "}
          {/* User Profile Picture */}
          <span>John Doe</span> {/* User Name */}
        </div>
      </div>
    </header>
  );
};
