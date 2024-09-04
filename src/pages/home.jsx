import React, { useEffect, useState } from "react";
import Nav from "../components/home/navbar";
import Hero from "../components/home/hero";
import FlashSale from "../components/home/flashsale";
import Category from "../components/home/category";
import Footer from "../components/home/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_URL}/products`).then((res) => {
        setProducts(res?.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className=" dark:bg-darkbg">
      {/* <Nav /> */}
      <Hero />
      <Category />
      <FlashSale products={products} />
    </div>
  );
}
