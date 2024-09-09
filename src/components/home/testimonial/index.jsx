import { Avatar } from "@nextui-org/react";
import React from "react";
import maxim from "../../../assets/image/maxim.png";
import nxp from "../../../assets/image/nxp.png";
import stm from "../../../assets/image/stm.png";
import microchip from "../../../assets/image/microchip.png";
import qualcomm from "../../../assets/image/qualcomm.png";
import ti from "../../../assets/image/texas instruments.png";

export default function Testimonial() {
  const manufacturers = [
    {
      id: 1,
      name: "Maxim Integrated",
      logo: maxim,
    },
    {
      id: 2,
      name: "NXP Semiconductors",
      logo: nxp,
    },
    {
      id: 3,
      name: "STMicroelectronics",
      logo: stm,
    },
    {
      id: 4,
      name: "Microchip Technology",
      logo: microchip,
    },
    {
      id: 5,
      name: "Qualcomm",
      logo: qualcomm,
    },
    {
      id: 6,
      name: "Texas Instruments",
      logo: ti,
    },
  ];

  return (
    <div className="  p-5 md:mx-[5%]">
      {/* Testimonials */}
      <div className=" pb-10 border-b ">
        <h1 className="font-bold text-xl mb-4">Testimonials</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="  p-5 rounded-lg">
            <p className="">
              "ElectroHub is my go-to for all electronic components! The quality is unmatched, and their fast shipping
              keeps my projects on schedule. Their expert support has been incredibly helpful!"
            </p>
            <div className="flex items-center mt-4">
              <Avatar
                // isBordered
                as="button"
                className="transition-transform"
                color="neutral"
                showFallback
                name="Mark T."
                size="sm"
                src=""
              />
              <div className="ml-4">
                <h2 className="font-bold"> Mark T.</h2>
                <p className=" text-xs">CEO, Company</p>
              </div>
            </div>
          </div>
          <div className="  p-5 rounded-lg">
            <p className="">
              "From resistors to Arduino boards, ElectroHub has everything I need at great prices. The customer service
              is fantastic, and delivery is always fast. Highly recommend!"
            </p>
            <div className="flex items-center mt-4">
              <Avatar
                // isBordered
                as="button"
                className="transition-transform"
                color="neutral"
                showFallback
                name="Sarah P."
                size="sm"
                src=""
              />
              <div className="ml-4">
                <h2 className="font-bold">Sarah P.</h2>
                <p className=" text-xs">CEO, Company</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Manufaturer */}
      <div
        className="flex marquee gap-16 items-center"
      >
        {manufacturers.map((manufacturer, index) => (
          <div key={index} className="  p-5 rounded-lg">
            <img src={manufacturer.logo} alt={manufacturer.name} className="w-[400px]   rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
