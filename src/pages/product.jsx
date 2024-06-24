import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../assets/data/product";
import { Button } from "@nextui-org/button";
import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon, MinusIcon, PlusIcon, ShareIcon } from "@heroicons/react/24/outline";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { formatCurrency } from "../utils/formatter";
import { addToCart, deleteFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import delivery from "../assets/image/carbon_delivery.svg";
import returnicon from "../assets/image/return.svg";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

export default function Product() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let id = useParams().id;
  const [displayImage, setDisplayImage] = useState();
  const product = products?.find((product) => product?.id.toString() === id.toString());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const item = cartItems.cartItems.find((item) => toString(item.id) === toString(id));

  const handlePress = (data) => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data?.title} has been added to your cart`);
    }
  };

  const handleAdd = (data) => {
    if (data) {
      dispatch(addToCart(data));
    }
  };
  const handleremove = (data) => {
    if (data) {
      dispatch(deleteFromCart(data));
    }
  };
  useEffect(() => {
    setDisplayImage(product?.img[0]);
  }, [product]);

  return (
    <div className="px-[12%] dark:bg-darkbg text-default-600 flex py-10 gap-[27px] ">
      <div className="w-[70%] h-full flex space-x-4  ">
        <div className="w-[20%] space-y-4 rounded overflow-hidden ">
          {product?.img.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className=" w-[8rem] object-contain cursor-pointer shadow aspect-square"
              onClick={() => {
                setDisplayImage(img);
              }}
            />
          ))}
        </div>
        <div className="w-[80%] shadow-md rounded h-fit overflow-hidden">
          <img src={displayImage} alt="" className=" w-full object-contain " />
        </div>
      </div>

      <div className="w-[50%]   py-10  relative gap-4 flex flex-col ">
        <div className="items-center flex justify-between    ">
          <h1 className=" text-xl text-default-900 ">{product?.title}</h1>
          <ShareIcon className="size-4 cursor-pointer" />
        </div>

        <div className=" p-1 items-center flex gap-3  ">
          <div className="flex gap-1 ">
            {Array.from({ length: 5 }).map((_, index) => {
              if (index < Math.floor(product?.star)) {
                return <ImStarFull key={index} className="size-4 text-[gold] fill-[gold]" />;
              } else if (index === Math.floor(product?.star) && product?.star % 1 !== 0) {
                return <ImStarHalf key={index} className="size-4 fill-[gold] text-[gold]" />;
              } else {
                return <ImStarEmpty key={index} className="size-4 " />;
              }
            })}
          </div>
          <div className=" flex items-center gap-3">
            <div className="text-xs text-secondary">({product?.reviews.length} reviews)</div>
            <div className="border-r border h-[16px]"></div>
            <div className="">
              {product?.inStock ? (
                <div className=" text-xs">(In-stock)</div>
              ) : (
                <div className="text-xs text-danger ">Out of stock</div>
              )}
            </div>
          </div>
        </div>
        <div className="gap-4 flex items-center">
          <p className=" text-primary text-3xl font-bold">{formatCurrency(parseInt(product?.price))}</p>
          <p className="text-danger text-xs line-through ">{formatCurrency(parseInt(product?.discount))}</p>
        </div>

        <div className=" border-b pb-4">
          <p className=" line-clamp-3  ">{product.description}</p>
          <Button onPress={onOpen} variant="fade" className='pl-0' >
            <span className=" text-xs text-primary cursor-pointer ">Read More</span>
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="xl" backdrop="opaque">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{product.title}</ModalHeader>
                  <ModalBody>
                    <p>{product.description}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose} onClick={() => handlePress(product)}>
                      Add to cart
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>

        <div className="space-y-2">
          <p className="">Quantity</p>
          <div className="flex items-center gap-2 border w-fit border-primary rounded  ">
            <button className="text-primary bg-transparent border-r border-primary  px-2 py-1   hover:bg-primary hover:text-white">
              <PlusIcon className="size-4" onClick={() => handleAdd(product)} />
            </button>
            <p className="text-sm">{item?.cartQuantity}</p>
            <button className="text-primary bg-transparent border-l border-primary  px-2 py-1   hover:bg-primary hover:text-white">
              <MinusIcon className="size-4" onClick={() => handleremove(product.id)} />
            </button>
          </div>
        </div>

        <div className=" flex items-center justify-between gap-6">
          <Button
            size="md"
            variant="bordered"
            radius="none"
            className="text-white w-full mt-2  bg-primary "
            onClick={() => handlePress(product)}
            startContent={<BiCart size={18} />}
          >
            Add to cart
          </Button>
          <HeartIcon
            className={
              product?.liked
                ? "hover:scale-110 ease-in-out size-8 fill-danger text-white cursor-pointer "
                : "text-white cursor-pointer hover:scale-110 ease-in-out size-8"
            }
          />
        </div>
        <div className="">
          <div className="border rounded-md">
            <div className="flex border-b gap-10 p-4 ">
              <img src={delivery} alt="" className=" w-8" />
              <div className="">
                <h1 className=" font-semibold">Delivery</h1>
                <p className="text-xs">
                  Delivery Fees ₦ 620 Ready for delivery between 24 June & 26 June when you order within next 3mins
                </p>
              </div>
            </div>
            <div className="flex  gap-10 p-4 ">
              <img src={returnicon} alt="" className=" w-8" />
              <div className="">
                <h1 className=" font-semibold">Return Policy</h1>
                <p className="text-xs">Free return within 7 days for ALL eligible itemsDetails</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
