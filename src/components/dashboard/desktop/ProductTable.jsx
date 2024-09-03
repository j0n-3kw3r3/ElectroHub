import React, { useEffect, useState } from "react";

import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
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

//  products data table function
export const ProductTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  

  const user = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [isModal, setIsModal] = useState();
  const getProduct = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_URL}/products`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setProducts(res?.data);
        });
    } catch (error) {
      console.log(error.message);
    }
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


  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="overflow-x-auto relative shadow ">
        {products.length > 0 ? (
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
                <th scope="col" className="py-5 px-6">
                  Quantity
                </th>
                <th scope="col" className="py-5 px-6"></th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <>
                  <tr key={product._id} className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                    <td className="py-4 px-6">
                      <img src={product?.images[0]?.url} alt="" className="w-20 aspect-square object-cover" />
                      {/* Display product image */}
                    </td>
                    <td className="py-4 px-6">{product?.title}</td>
                    <td className="py-4 px-6">${product?.price}</td>
                    <td className="py-4 px-6">${product?.discount}</td>
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
                            }}
                          >
                            Edit Product
                          </DropdownItem>

                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            onClick={() => {
                              setIsModal("delete");
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
                  {isModal === "edit" && <EditProduct isOpen={isOpen} onOpenChange={onOpenChange} />}

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
                              <Button color="primary" onPress={onClose} onClick={() => {
                                deleteProduct(product._id)
                              }
                              } >
                                Delete
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  )}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className=" py-4 mx-auto w-full text-gray-500 text-center ">Empty Product.</div>
        )}
      </div>
    </>
  );
};
