import { Badge, Button, Card, CardBody, CardFooter, ScrollShadow } from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { products } from "../../../assets/data/product";
import { formatCurrency } from "../../../utils/formatter";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";

export default function NewArival({ products }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePress = (data) => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data.name} has been added to your cart`, {
        className: " text-xs",
      });
    }
  };

  // filter product based in IsProductNew
  const newProducts = products.filter((item) => item?.isProductNew);

  return (
    <div className="  md:px-[10%] p-10 bg-primary/5 text-default-600">
      <h1 className="font-bold text-xl mb-4 ">New Arrival</h1>
      <ScrollShadow className="w-full  " hideScrollBar offset={100} orientation="horizontal" size={20}>
        <div className="gap-4 w-fit flex p-1">
          {newProducts?.map((item, index) => (
            <Badge
              content="new"
              className="bg-secondary text-white "
              size="sm"
              isInvisible={item?.isProductNew}
              placement="top-left"
              key={index}
            >
              <Card shadow="sm" radius="none" className="rounded-sm md:text-medium text-xs md:text-sm w-[13em] md:w-[14em] ">
                <CardBody className="overflow-visible h-[8em] p-0 border-b shadow bg-white/80 ">
                  <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white/80  ">
                    <HeartIcon
                      size={20}
                      className={
                        !item?.likes.length
                          ? "text-danger size-5 cursor-pointer hover:scale-110  "
                          : " text-danger fill-danger size-5 cursor-pointer hover:scale-110 "
                      }
                    />
                  </div>
                  <img
                    alt={item?.name}
                    className="w-full object-contain h-full cursor-pointer "
                    src={item?.images[0]?.url}
                    onClick={() => {
                      navigate(`/product/${item?.id}`);
                    }}
                  />
                </CardBody>
                <CardFooter className=" text-center w-full p-2 flex flex-col gap-1 items-start ">
                  <p
                    className="xs text-center w-full cursor-pointer "
                    onClick={() => {
                      navigate(`/product/${item?.id}`);
                    }}
                  >
                    {item?.name}
                  </p>
                 
                  <div className="flex justify-between w-full">

                  <div className=" text-left gap-2 items-center">
                    <p className="text-default-500 ">{formatCurrency(parseInt(item?.price))}</p>
                    <p className="text-danger text-xs line-through ">{formatCurrency(parseInt(item?.discount))}</p>
                  </div>
                  <button
                    size="sm"
                    variant="bordered"
                    radius="none"
                    className="text-white text-xs border rounded px-2 py-1 mt-2 bg-primary  hover:bg-primary hover:text-white "
                    onClick={() => handlePress(item)}
                  >
                    ORDER
                  </button>
                  </div>
                </CardFooter>
              </Card>
            </Badge>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
