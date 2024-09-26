import { Badge, Button, Card, CardBody, CardFooter, ScrollShadow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatter";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { API_URL } from "../../../constant";

export default function TopSale({ products, userId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 3600 + 59 * 60 + 21);

  // filter product based in featured
  const featuredProducts = products.filter((item) => item?.isFeatured);

  //  toggle like
  const handleLike = (data) => {
    if (data) {
      axios.post(`${API_URL}/like/${data.id}/${userId}`).then((res) => {
        setLikes((prevLikes) => ({
          ...prevLikes,
          id: data.id,
        }));
      });
    }
  };

    const handlePress = (data) => {
      if (data) {
        dispatch(addToCart(data));
        toast.success(`${data?.title} has been added to your cart`);
      }
    };

  return (
    <div className=" md:px-[10%] px-[5%] bg-primary/5 p-10 text-default-600">
      <h1 className="font-bold md:text-xl mb-4  ">Top selling items</h1>
      <ScrollShadow className="w-full  " hideScrollBar offset={100} orientation="horizontal" size={20}>
        <div className="gap-4 w-fit flex p-1">
          {featuredProducts?.map((item, index) => {
            let liked = false;
            const likedUser = item.likes.map((like) => {
              return like?.user;
            });

            if (likedUser.includes(userId)) {
              liked = true;
            }

            return (
              <Card shadow="sm" key={index} radius="none" className="rounded-sm w-[13em]">
                <CardBody className="overflow-visible p-0 bg-white/80 ">
                  <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white/80  ">
                    <HeartIcon
                      size={20}
                      className={
                        liked
                          ? "text-danger fill-danger size-5 cursor-pointer hover:scale-110"
                          : "text-danger size-5 cursor-pointer hover:scale-110"
                      }
                      onClick={() => handleLike(item)}
                    />
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
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
}
