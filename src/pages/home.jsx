import React from "react";
import Nav from "../components/molecules/navbar";
import Hero from "../components/molecules/hero";
import FlashSale from "../components/flashsale";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <FlashSale/>
    </>
  );
}
