import { Badge, ScrollShadow } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatter";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function NewArival({ products, userId }: { products: any[]; userId: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePress = (data: any) => {
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
    <div className="  md:px-[10%] p-5 px-[5%] bg-primary/5 text-default-600">
      <h1 className="font-bold text-xl mb-4 ">New Arrival</h1>
      <ScrollShadow className="w-full  " hideScrollBar offset={100} orientation="horizontal" size={20}>
        <div className="gap-4 w-fit flex p-1 overflow-auto scrollbar-hide ">
          {newProducts?.map((item, index) => (
            <Card className="rounded-sm md:text-medium text-xs p-0 w-[13em] md:w-[14em] flex flex-col ">
              <CardHeader className="overflow-hidden w-full h-[10em] p-0 border-b shadow bg-white/80 ">
                <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white/80  ">
                  <HeartIcon
                    width={20}
                    height={20}
                    className={
                      !item?.likes.length
                        ? "text-danger md:size-5 size-4 cursor-pointer hover:scale-110  "
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
              </CardHeader>
              <CardContent className="  text-center w-full p-2 flex flex-col flex-grow justify-between gap-1 items-start ">
                <p
                  className="xs text-center w-full cursor-pointer "
                  onClick={() => {
                    navigate(`/product/${item?.id}`);
                  }}
                >
                  {item?.name}
                </p>
                
              </CardContent>
              <CardFooter className="w-full mb-0 p-2"><div className="flex justify-between w-full gap-1 ">
                  <div className=" text-left gap-2 items-center">
                    <p className="text-default-500 text-sm font-bold ">{formatCurrency(parseInt(item?.price))}</p>
                    <p className="text-danger text-xs ">{item?.discount}% off</p>
                  </div>
                  <Button
                    className="text-white text-[10px]  border rounded px-4  hover:text-white "
                    onClick={() => handlePress(item)}
                  >
                    ORDER
                  </Button>
                </div></CardFooter>
            </Card>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
