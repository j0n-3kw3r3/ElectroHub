import { HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatter";
import { addToCart } from "../redux/cartSlice";

export default function SearchResult() {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = location.state?.results || [];

  const itemsPerPage = 10; // Number of items to display per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handlePress = (data) => {
    console.log(data);
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data.name} has been added to your cart`, {
        className: " text-xs",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        {/* Filter Options */}
        <div className="w-1/4 p-4 border-r border-gray-300">
          <h3 className="text-xl font-semibold mb-4">Filter Options</h3>
          {/* Add your filter options here */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Category</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Categories</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Price Range</label>
            <input type="range" className="w-full" min="0" max="1000" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Rating</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Ratings</option>
              <option value="4">4 stars & up</option>
              <option value="3">3 stars & up</option>
              <option value="2">2 stars & up</option>
              <option value="1">1 star & up</option>
            </select>
          </div>
        </div>

        {/* Search Results */}
        <div className="w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-6 text-center border-b ">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-6 ">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div shadow="sm" key={item._id} radius="none" className="w-[16em] flex flex-col border ">
                  <div className="overflow-visible  bg-neutral ">
                    <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white  ">
                      <HeartIcon
                        size={20}
                        className={"text-danger size-5 cursor-pointer hover:scale-110"}
                        // onClick={() => handleLike(item)}
                      />
                    </div>
                    <img
                      alt={item?.name}
                      className="w-full object-contain h-[10em] cursor-pointer "
                      src={item?.images[0]?.url}
                      onClick={() => {
                        navigate(`/product/${item?._id}`, { state: { item } });
                      }}
                    />
                  </div>
                  <div className="text-small text-left flex flex-col flex-1 justify-between p-2 ">
                    <div className="">
                      <b
                        className=" cursor-pointer "
                        onClick={() => {
                          navigate(`/product/${item?._id}`);
                        }}
                      >
                        {item?.name}
                      </b>
                      <div className="flex items-center gap-2">
                        <StarIcon className={item?.star ? "size-4 fill-[gold] " : "size-4"} color="gold" />
                        <b>•</b>
                        <p className="text-default-300 text-xs">500+ sold</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-default-500 ">{formatCurrency(parseInt(item?.price))}</p>
                        <p className="text-danger text-xs line-through ">{formatCurrency(parseInt(item?.discount))}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="bordered"
                      radius="none"
                      className="text-primary w-full mt-2 border-primary  hover:bg-primary hover:text-white "
                      onClick={() => handlePress(item)}
                    >
                      <ShoppingCartIcon className="size-4" />
                      Add to cart
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No results found.</p>
            )}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-primary text-white" : "bg-white text-primary border-primary"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
