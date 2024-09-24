import { Badge, Button, Card, CardBody, CardFooter, ScrollShadow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatter";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function FlashSale({ products, userId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 3600 + 59 * 60 + 21);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}h:${minutes.toString().padStart(2, "0")}m:${seconds
    .toString()
    .padStart(2, "0")}s`;

  const handlePress = (data) => {
    console.log(data);
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data.name} has been added to your cart`, {
        className: " text-xs",
      });
    }
  };

  // filter product based in featured
  const featuredProducts = products.filter((item) => item?.isFeatured);


  //  toggle like
  const handleLike = (data) => {
    if (data) {
      axios.post(`${import.meta.env.VITE_URL}/like/${data.id}/${userId}`).then((res) => {
        setLikes((prevLikes) => ({
          ...prevLikes,
          id: data.id,
        }));
      });
    }
  };

  return (
    <div className=" md:px-[10%] p-10 bg-primary/5 text-default-600  ">
      <div className="bg-red-500 text-white p-2">
        <div className="flex justify-between items-center ">
          <h3 className="font-bold text-xl">Flash Sale</h3>
          <p className="text-sm">Time Left: {formattedTime}</p>
          <a href="#" className="text-white text-sm underline">
            SEE ALL
          </a>
        </div>
      </div>
      <ScrollShadow className="w-full  " hideScrollBar offset={100} orientation="horizontal" size={20}>
        <div className="gap-4 w-full flex p-1   shadow ">
          {featuredProducts?.map((item, index) => {
            let liked = false;
            const likedUser = item.likes.map((like) => {
              return like?.user;
            });

            if (likedUser.includes(userId)) {
              liked = true;
            }

            return (
              <Card shadow="sm" key={index} radius="none" className="w-[13em] ">
                <CardBody className="overflow-visible p-0 border-b ">
                  <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-red-500 text-white  ">
                    -{item.discount}%
                  </div>
                  <img
                    alt={item?.name}
                    className="w-full object-contain h-[10em] cursor-pointer "
                    src={item?.images[0]?.url}
                    onClick={() => {
                      navigate(`/product/${item?.id}`);
                    }}
                  />
                </CardBody>
                <CardFooter className="text-small text-left flex flex-col gap-1 items-start ">
                  <b
                    className=" cursor-pointer "
                    onClick={() => {
                      navigate(`/product/${item?.id}`);
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
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
}
