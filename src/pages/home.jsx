import React, { useEffect, useState } from "react";
import Nav from "../components/home/navbar";
import Hero from "../components/home/hero";
import FlashSale from "../components/home/flashsale";
import Category from "../components/home/category";
import Footer from "../components/home/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SectionOne from "../components/home/sectionone";
import Testimonial from "../components/home/testimonial";
import NewArival from "../components/home/newarival";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsEP } from "../services";

export default function Home() {
  const user = useSelector((state) => state.auth);

  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className=" dark:bg-darkbg">
      {/* <Nav /> */}
      <Hero />

      <SectionOne />
      {data.length > 0 && <NewArival products={data} userId={user.id} />}
      <Category />
      {data.length > 0 && <FlashSale products={data} userId={user.id} />}
      <Testimonial />
    </div>
  );
}
