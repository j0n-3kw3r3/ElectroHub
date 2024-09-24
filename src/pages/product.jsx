import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { fetchProductsEP } from "../services";
import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../utils/getRecomendation";

const reviews = [
  {
    id: 1,
    username: "John Doe",
    rating: 5,
    comment: "Excellent product! Highly recommend.",
    date: "2023-10-01",
  },
  {
    id: 2,
    username: "Jane Smith",
    rating: 4,
    comment: "Very good quality, but a bit expensive.",
    date: "2023-09-25",
  },
  {
    id: 3,
    username: "Alice Johnson",
    rating: 3,
    comment: "Average product, nothing special.",
    date: "2023-09-20",
  },
];
const merchantProfile = {
  name: "John's Electronics",
  description: "We offer a wide range of electronic products including smartphones, laptops, and accessories.",
  location: "123 Market St, Springfield, IL",
  contact: "john@example.com",
  rating: 4.5,
};

export default function Product() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let id = useParams().id;
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState();
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("Specifications");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
  });
  const product = products && products?.find((product) => product?.id.toString() === id.toString());
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const item = cartItems.cartItems.find((item) => toString(item.id) === toString(id));
  const featuredProducts = products?.filter((item) => item?.isFeatured);

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

  // Save product name to searched array in local storage on the load of this page
  const saveSearchedItem = () => {
    const store = localStorage.getItem("searches");
    let searches = store ? JSON.parse(store) : [];

    if (!searches.includes(product?.name)) {
      searches.push(product?.name);
      localStorage.setItem("searches", JSON.stringify(searches));
    }
  };

    useEffect(() => {
    }, [products, categories]);
    
    useEffect(() => {
      getRecommendations(products, categories, setRecommendations);
      setDisplayImage(product?.images[0]?.url);
      saveSearchedItem();
    }, [product, categories]);

  if (isPending) return <>Loading...</>;

  return (
    <div className=" dark:bg-darkbg text-default-600 gap-[1.6875rem] ">
      <div className="flex md:flex-row flex-col ">
        <div className="md:w-1/2 md:p-16 p-8 h-full flex md:flex-row flex-col-reverse gap-4 ">
          <div className="md:w-[15%]  flex md:flex-col flex-row gap-4 rounded ">
            {product?.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt=""
                className=" md:w-full w-[15%] object-contain cursor-pointer shadow aspect-square"
                onClick={() => {
                  setDisplayImage(img.url);
                }}
              />
            ))}
          </div>
          <div className="md:w-[90%] shadow-md rounded border h-fit overflow-hidden">
            <img src={displayImage} alt="" className=" w-full object-contain aspect-square" />
          </div>
        </div>

        <div className="md:w-1/2 p-10 md:py-24 pt-4 bg-white relative gap-4 flex flex-col ">
          <div className="items-center flex justify-between    ">
            <h1 className=" text-xl text-default-900 ">{product?.name}</h1>
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
            <p className="text-danger text-xs ">-{product?.discount}%</p>
          </div>

          <div className=" border-b pb-4">
            {/* <p className=" line-clamp-3  ">{product?.description}</p> */}
            {/* <Button onPress={onOpen} variant="fade" className=" pl-0">
              <span className=" text-xs text-primary cursor-pointer ">Read More</span>
            </Button> */}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="xl" backdrop="opaque">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">{product?.title}</ModalHeader>
                    <ModalBody>
                      <p>{product?.description}</p>
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
                  ? "hover:scale-110 ease-in-out size-8 fill-danger text-red-500 cursor-pointer "
                  : "text-red-500 cursor-pointer hover:scale-110 ease-in-out size-8"
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

      <div className=" bg-primary/5 md:p-20 p-8 pt-10 gap-10 flex md:flex-row flex-col ">
        <div className=" bg-white md:w-2/3 p-4 rounded-lg shadow-md">
          <div className="flex justify-between border-b border-gray-200 mb-4">
            <div
              className={`text-sm w-full text-center cursor-pointer px-4 py-2 ${
                activeTab === "Specifications" ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick("Specifications")}
            >
              Specifications
            </div>
            <div
              className={`text-sm w-full text-center cursor-pointer px-4 py-2 ${
                activeTab === "Reviews" ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick("Reviews")}
            >
              Reviews
            </div>

            <div
              className={`text-sm w-full text-center cursor-pointer px-4 py-2 ${
                activeTab === "Marchant" ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick("Marchant")}
            >
              Marchant
            </div>
          </div>

          <div className="p-4 max-h-[25rem] overflow-auto scrollbar-hide ">
            {activeTab === "Specifications" && <p className="text-gray-700">{product?.description}</p>}
            {activeTab === "Reviews" && (
              <div className="">
                {reviews.map((review) => (
                  <Review
                    key={review.id}
                    username={review.username}
                    rating={review.rating}
                    comment={review.comment}
                    date={review.date}
                  />
                ))}
              </div>
            )}{" "}
            {activeTab === "Marchant" && (
              <div className="border p-4 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between border-b p-2 ">
                  <h2 className="text-2xl font-semibold mb-4">Merchant Profile</h2>
                  <div className="w-16 h-16 border bg-primary/5 overflow-hidden rounded-full mr-2">
                    <img
                      src={item.images[0].url}
                      alt="Rucksack Backpack Large"
                      className=" object-cover w-full h-full "
                    />
                  </div>
                </div>
                <div className=" py-4 ">
                  <p className="">
                    <strong>Name:</strong> {merchantProfile.name}
                  </p>
                  <p className="">
                    <strong>Description:</strong> {merchantProfile.description}
                  </p>
                  <p className="">
                    <strong>Location:</strong> {merchantProfile.location}
                  </p>
                  <p className="">
                    <strong>Contact:</strong> {merchantProfile.contact}
                  </p>
                  <p className="">
                    <strong>Rating:</strong> {merchantProfile.rating} / 5
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
       {recommendations && <div className="bg-white p-4 md:w-1/3 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Similar Items</h3>
          {recommendations.map((item) => (
            <ul className="list-none text-sm " key={item.name}>
              <li
                className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}
              >
                <img
                  src={item.images[0].url}
                  alt="Rucksack Backpack Large"
                  className="w-16 h-16 border rounded-lg mr-2"
                />
                <div>
                  <p className="text-gray-700">{item.name}</p>
                  <p className="text-gray-500">Line Mounts</p>
                  <p className="text-gray-700 font-semibold">{formatCurrency(parseInt(item?.price))}</p>
                </div>
              </li>
            </ul>
          ))}
        </div>}
      </div>
    </div>
  );
}

const Review = ({ username, rating, comment, date }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{username}</h3>
        <span className="text-yellow-500">
          {"★".repeat(rating)} <span className="text-gray-400">{"★".repeat(5 - rating)}</span>
        </span>
      </div>
      <p className="text-gray-600 mb-2">{comment}</p>
      <p className="text-gray-400 text-sm">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
};
