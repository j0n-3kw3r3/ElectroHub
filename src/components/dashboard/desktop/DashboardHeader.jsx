import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "@nextui-org/react";

// header component
export const Header = () => {
  const user = useSelector((state) => state.auth);
  return (
    <header className="bg-white  shadow-primary/20 shadow-md text-default-600 z-50 sticky w-full top-0 flex justify-between items-center p-4 py-6">
      <div className="flex items-center">
        {/* Brand Name */}
        <span className="text-xl font-bold">Admin Dashboard</span>
      </div>
      <div className="flex items-center space-x-4 ">
        <div className="flex items-center  p-1 px-3 rounded border  text-default-600 placeholder-default-600/70  ">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none border-none transition text-sm duration-150 ease-in-out"
            style={{ backdropFilter: "blur(5px)" }}
          />
          <MagnifyingGlassIcon className="size-4 cursor-pointer " />
        </div>
        {/* Search Bar */}
          <Badge content="" shape="circle" color="danger" size="sm" placement="top-right">
            <BellIcon className="size-5" />
          </Badge>
        <div className="flex items-center cursor-pointer">
          <Avatar
            // isBordered
            as="button"
            className="transition-transform"
            color="neutral"
            showFallback
            name={user?.name}
            size="sm"
            src={user?.picture}
          />
        </div>
      </div>
    </header>
  );
};
