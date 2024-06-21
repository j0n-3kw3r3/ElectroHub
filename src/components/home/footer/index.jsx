import React from "react";
import { BsInstagram, BsLinkedin, BsX } from "react-icons/bs";
import { FaDhl } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrVisa } from "react-icons/gr";
import { RiMastercardFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className=" bg-white dark:bg-darkbg text-default-600  border-t border-default-300 px-[10%] py-6 pt-10  ">
      <div className="md:flex md:justify-between mb-2  ">
        <div className="flex gap-6 justify-center items-center  ">
          <BsInstagram size={15} />
          <FaXTwitter size={15} />
          <BsLinkedin size={15} />
        </div>
        <div>
          <h1 className="font-bold text-xs text-center  ">PAYMENT METHODS & DELIVERY PARTNERS</h1>
          <div className="flex justify-center gap-4  ">
            <GrVisa size={25} />
            <FaDhl size={25} />
            <RiMastercardFill size={25} />
          </div>
        </div>
      </div>

      <div className="flex gap-6 justify-center ">
        <a href="#" className="text-xs  hover:text-secondary">
          Terms & Conditions
        </a>
        <a href="#" className="text-xs  hover:text-secondary">
          Privacy Policy
        </a>
        <a href="#" className="text-xs  hover:text-secondary">
          Return Policy
        </a>
      </div>
      <p className="text-xs text-center">©2024 Electrohub. All rights reserved.</p>
    </div>
  );
}
