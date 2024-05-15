import React from "react";
import Nav from "../components/molecules/navbar";
import Hero from "../components/molecules/hero";
import FlashSale from "../components/flashsale";
import Category from "../components/category";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Category />
      <FlashSale/>
    </>
  );
}
