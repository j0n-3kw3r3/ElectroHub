import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../assets/data/product";

export default function Product() {
  
  let id = useParams().id;
  const product = products?.find((product) => product?.id.toString() === id.toString());
  
  return (
    <div className="px-[12%] flex pt-4 ">
      <div className="w-[30%] h-[] bg-neutral shadow border border-default-300 ">
        <img src={product?.img} alt="" className=" w-full h-full " />
      </div>
      <div className="w-[40%] ">
      </div>
    </div>
  );
}
