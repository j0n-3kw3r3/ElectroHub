import React, { useEffect, useState } from "react";

import { EllipsisVerticalIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ModalFooter,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { EditProduct } from "./EditProduct";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsEP } from "../../../services";
import { usePagination } from "../../pagination";

//  products data table function
export const ProductTable = () => {
  const [filtersProducts, setFiltersProducts] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector((state) => state.auth);
  const [productId, setProductId] = useState();
  const [isModal, setIsModal] = useState();
  const itemsPerPage = 10; // Number of items to display per page

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
    staleTime: 5 * 1000,
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Function filters logistics data based on search input
  const handleSearchOrder = (e) => {
    const filteredData = products.filter((item) => {
      return (
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
        (typeof item.inStock === "boolean" &&
          item.inStock.toString().toLowerCase().includes(e.target.value.toLowerCase()))
      );
    });
    setFiltersProducts(filteredData ? filteredData : products);
  };

  const deleteProduct = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_URL}/products/delete/${id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          getProduct();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // const { currentPage, totalPages, currentItems, handlePageChange } = usePagination(products, itemsPerPage);
  // const {
  //   currentPage: currentPageFilterd,
  //   totalPages: totalFilterdPages,
  //   currentItems: currentFilterdItems,
  //   handlePageChange: handlePageChangeFilterd,
  // } = usePagination(filtersProducts, itemsPerPage);

  return (
    <>
      <div className="flex  ">
        <div className="flex items-center p-1 px-3 rounded border  text-default-600 placeholder-default-600/70 w-fit  ">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none border-none transition text-sm duration-150 ease-in-out bg-transparent "
            style={{ backdropFilter: "blur(5px)" }}
            onChange={handleSearchOrder}
          />
          <MagnifyingGlassIcon className="size-4 cursor-pointer " />
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide relative shadow-md rounded-lg">
        {products.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs  uppercase  border border-b-primary dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-4 px-6"></th>
                <th scope="col" className="py-4 px-6">
                  Product
                </th>
                <th scope="col" className="py-4 px-6">
                  Price
                </th>
                <th scope="col" className="py-4 px-6">
                  Discount
                </th>
                <th scope="col" className="py-4 px-6">
                  Rating
                </th>
                <th scope="col" className="py-4 px-6">
                  Stock
                </th>
                <th scope="col" className="py-4 px-6">
                  Quantity
                </th>
                <th scope="col" className="py-4 px-6"></th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {filtersProducts.length > 0
                ? filtersProducts?.map((product) => (
                    <>
                      <tr key={product?.id} className="border-b odd:bg-white/80 even:bg-gray-50 hover:bg-primary/5  ">
                        <td className="py-4 px-6 w-[200px] rounded ">
                          <img src={product?.images[0]?.url} alt="" className=" rounded  object-cover w-full " />
                          {/* Display product image */}
                        </td>
                        <td className="py-4 px-6">{product?.name}</td>
                        <td className="py-4 px-6">${product?.price}</td>
                        <td className="py-4 px-6">{product?.discount}%</td>
                        <td className="py-4 px-6">{product?.star}</td>
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
                        <td className="py-4 px-6 cursor-pointer">
                          <Dropdown>
                            <DropdownTrigger>
                              <EllipsisVerticalIcon className="size-4 " />
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                              <DropdownItem
                                key="new"
                                shortcut="⌘N"
                                startContent={<PencilSquareIcon className="size-4" />}
                                onPress={onOpen}
                                onClick={() => {
                                  setIsModal("edit");
                                  setProductId(product);
                                }}
                              >
                                Edit Product
                              </DropdownItem>

                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                onClick={() => {
                                  setIsModal("delete");
                                  setProductId(product);
                                }}
                                color="danger"
                                shortcut="⌘⇧D"
                                onPress={onOpen}
                                startContent={<TrashIcon className="size-4" />}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    </>
                  ))
                : products?.map((product) => (
                    <>
                      <tr key={product?.id} className="border-b odd:bg-white/80 even:bg-gray-50 hover:bg-primary/5">
                        <td className="py-4 px-6 rounded ">
                          <img
                            src={product?.images[0]?.url}
                            alt=""
                            className="w-20 rounded aspect-square object-cover"
                          />
                          {/* Display product image */}
                        </td>
                        <td className="py-4 px-6">{product?.name}</td>
                        <td className="py-4 px-6">${product?.price}</td>
                        <td className="py-4 px-6">{product?.discount}%</td>
                        <td className="py-4 px-6">{product?.star}</td>
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
                        <td className="py-4 px-6 cursor-pointer">
                          <Dropdown>
                            <DropdownTrigger>
                              <EllipsisVerticalIcon className="size-4 " />
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                              <DropdownItem
                                key="new"
                                shortcut="⌘N"
                                startContent={<PencilSquareIcon className="size-4" />}
                                onPress={onOpen}
                                onClick={() => {
                                  setIsModal("edit");
                                  setProductId(product);
                                }}
                              >
                                Edit Product
                              </DropdownItem>

                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                onClick={() => {
                                  setIsModal("delete");
                                  setProductId(product);
                                }}
                                color="danger"
                                shortcut="⌘⇧D"
                                onPress={onOpen}
                                startContent={<TrashIcon className="size-4" />}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    </>
                  ))}
            </tbody>
          </table>
        ) : (
          <div className=" py-4 mx-auto w-full text-gray-500 text-center ">Empty Product.</div>
        )}
      </div>

      {isModal === "edit" && <EditProduct isOpen={isOpen} onOpenChange={onOpenChange} product={productId} />}

      {/* delete modal */}
      {isModal === "delete" && (
        <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
                <ModalBody>
                  <p>Are sure you want to delete this product</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={() => {
                      deleteProduct(productId?.id);
                    }}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {/* {Array.from({ length: totalPages ? totalPages : totalFilterdPages }, (_, index) => (
        <button
          key={index}
          onClick={() => {
            if (filtersProducts.length > 0) {
              handlePageChangeFilterd(index + 1);
            }
            handlePageChange(index + 1);
          }}
          className={`mx-1 px-3 py-1 border rounded ${
            filtersProducts?.length > 0
              ? currentPageFilterd === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white/80 text-blue-500 border-blue-500"
              : currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-white/80 text-blue-500 border-blue-500"
          }`}
        >
          {index + 1}
        </button>
        ))} */}
      </div>
    </>
  );
};
