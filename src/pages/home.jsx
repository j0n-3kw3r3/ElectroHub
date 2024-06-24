import React from "react";
import Nav from "../components/home/navbar";
import Hero from "../components/home/hero";
import FlashSale from "../components/home/flashsale";
import Category from "../components/home/category";
import Footer from "../components/home/footer";

export default function Home() {
  return (
    <div className=" dark:bg-darkbg">
      {/* <Nav /> */}
      <Hero />
      <Category />
      <FlashSale />

    </div>


  );
}
