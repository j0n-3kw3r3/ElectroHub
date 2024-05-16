import { Badge, Button, Card, CardBody, CardFooter, ScrollShadow } from "@nextui-org/react";
import React from "react";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { products } from "../../../assets/data/product";

export default function FlashSale() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePress = (data) => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data.title} has been added to your cart`);
    }
  };

  return (
    <div className=" my-5 md:mx-[10%] p-5 ">
      <h1 className="font-bold text-xl mb-4 ">Top selling items</h1>
      <ScrollShadow className="w-full  " hideScrollBar offset={100} orientation="horizontal" size={20}>
        <div className="gap-4 w-fit flex p-1">
          {products.map((item, index) => (
            <Badge
              content="new"
              className="bg-primary text-white "
              size="sm"
              isInvisible={!item.new}
              placement="top-left"
              key={index}
            >
              <Card shadow="sm" radius="none" className="w-[16em]">
                <CardBody className="overflow-visible p-0 bg-neutral ">
                  <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white  ">
                    {item.liked ? (
                      <GoHeartFill size={20} className="text-danger" />
                    ) : (
                      <GoHeart size={20} className="hover:text-danger " />
                    )}
                  </div>
                  <img
                    alt={item.title}
                    className="w-full object-contain h-[10em] cursor-pointer "
                    src={item.img}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                    }}
                  />
                </CardBody>
                <CardFooter className="text-small text-left flex flex-col gap-1 items-start ">
                  <b
                    className=" cursor-pointer "
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    {item.title}
                  </b>
                  <div className="flex items-center gap-2">
                    {item.star ? <ImStarFull color="gold" /> : <ImStarEmpty />}
                    <p>{item.star}</p>
                    <b>•</b>
                    <p className="text-default-300 text-xs">500+ sold</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-default-500 ">{item.price}</p>
                    <p className="text-danger text-xs line-through ">{item.discount}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="bordered"
                    radius="none"
                    className="text-secondary w-full mt-2  hover:bg-secondary hover:text-white "
                    onClick={() => handlePress(item)}
                  >
                    <BiCart />
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            </Badge>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
