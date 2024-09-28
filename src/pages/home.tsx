import React, { useEffect, useState } from "react";
import Hero from "../components/home/hero";
import Category from "../components/home/category";
import SectionOne from "../components/home/sectionone";
import Testimonial from "../components/home/testimonial";
import NewArival from "../components/home/newarival";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsEP } from "../services";
import TopSale from "../components/home/topsale";
import FlashSale from "../components/home/flashsale";

export default function Home() {
  const user = useSelector((state:any) => state.auth);

  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
    staleTime: 1000 * 60 * 60 * 24,
  });
  // if (isPending) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  return (
    <div className="  ">
      <div className="bg-red-00 border-b p-1 text-center ">
        <p className="text-[.625rem] md:text-sm border-t  border-primary border-b md:p-2 p-1 ">
          Holiday Sale! Get 20% off on all products. Use code <span className="font-bold text-primary">HOLIDAY20</span>
        </p>
      </div>
      <Hero data={data} />

      <SectionOne data={data} />
      {data?.length > 0 && <FlashSale products={data} userId={user.id} />}
      <Category data={data} />
      {data?.length > 0 && <NewArival products={data} userId={user.id} />}
      <div className=" border-red-500 border-b border-t  text-red-500 p-2 text-center ">
        <h3 className="md:text-xl text-sm font-bold">CLOSEOUT DEALS</h3>
        <p className="md:text-sm text-[.625rem]">
          Discover the best deals on Micro Controllers and save up to 40% while you're at it!
        </p>
        <a href="#" className=" underline text-sm">
          Shop Now
        </a>
      </div>
      {data?.length > 0 && <TopSale products={data} userId={user.id} />}
      <Testimonial />
    </div>
  );
}
