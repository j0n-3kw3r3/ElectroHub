import React from "react";
import circuit from "../../../assets/image/ic.png";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <div className="bg-neutral dark:text-default-200 text-default-800  shadow w-full ">
      <div className="mx-[6%] md:mr-0 md:ml-[14%]  items-center md:flex gap-6 ">
        <div className=" md:w-[50%] w-full md:mx-0 pt-20 ">
          <h1 className="text-4xl font-black  ">Power Your Projects with Quality Electronic Components</h1>
          <p className="text-sm my-6 ">
            Find top-quality capacitors, resistors, Arduino boards, test meters, and more. Fast shipping, competitive
            pricing, and expert support. Start building your project today!
          </p>
          <button className="bg-primary text-white px-4 py-2 flex items-center gap-2 shadow-lg hover:scale-105 ease-in-out duration-150  ">
            Shop now{" "}
            <span>
              <FiArrowRight />
            </span>{" "}
          </button>
        </div>
        <div className="md:w-[50%] ">
          <img src={circuit} alt="hero" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
