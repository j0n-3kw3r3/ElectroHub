import React from "react";

import { products } from "../../assets/data/product";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

//  products data table function
export const ProductTable = () => {

  return (
    <div className="overflow-x-auto relative shadow ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-5 px-6"></th>
            <th scope="col" className="py-5 px-6">
              Product
            </th>
            <th scope="col" className="py-5 px-6">
              Price
            </th>
            <th scope="col" className="py-5 px-6">
              Discount
            </th>
            <th scope="col" className="py-5 px-6">
              Rating
            </th>
            <th scope="col" className="py-5 px-6">
              Stock
            </th>
            <th scope="col" className="py-5 px-6">Quantity</th>
            <th scope="col" className="py-5 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100">
              <td className="py-4 px-6">
                <img src={product.img[0]} alt={product.title} className="w-20 aspect-square object-cover" />{" "}
                {/* Display product image */}
              </td>
              <td className="py-4 px-6">{product.title}</td>
              <td className="py-4 px-6">${product.price.toFixed(2)}</td>
              <td className="py-4 px-6">${product.discount.toFixed(2)}</td>
              <td className="py-4 px-6">{product.star}</td>
              <td className="py-4 px-6 text-xs">
                {product.inStock ? (
                  <div className=" items-center text-center px-3 w-[110px] py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    In-Stock
                  </div>
                ) : (
                  <div className=" items-center text-center px-3 w-[110px] py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Out-of-Stock
                  </div>
                )}
              </td>{" "}
              <td className="py-4 px-6">
                {product?.quantity} {/* Display product quantity */}
              </td>
              <td className="py-4 px-6">
                <button className=" ">
                  <EllipsisVerticalIcon className="size-4 " />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
