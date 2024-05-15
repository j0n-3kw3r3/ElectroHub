import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Image, ScrollShadow } from "@nextui-org/react";
import React from "react";
import arduino from "../../assets/image/arduino.png";
import PowerSupply  from "../../assets/image/DC Power Supply Variable, 120V 3A Bench Power Supply.png";
import Zoyi from "../../assets/image/Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter.png";
import NE555 from "../../assets/image/NE555 Timer.png";
import Raspberry from "../../assets/image/Raspberry pi 4(4GB RAM).png";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { HiHeart } from "react-icons/hi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiCart } from "react-icons/bi";

export default function FlashSale() {
  const list = [
    {
      title: "Arduino uno r3",
      img: arduino,
      price: "₦13,500.00",
      star: "3.5",
      discount: "₦30000",
      liked: false,
      new: true,
    },
    {
      title: "Raspberry pi 4(4GB RAM)",
      img: Raspberry,
      price: "₦85,000.00",
      star: "3.5",
      discount: "₦105,000.00",
      liked: true,
      new: false,
    },
    {
      title: "NE555 Timer IC",
      img: NE555,
      price: "₦100.00",
      star: "3.5",
      discount: "₦200.00",
      liked: true,
      new: true,
    },
    {
      title: "Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter",
      img: Zoyi,
      price: "₦25,000.00",
      star: "3.5",
      discount: "₦27,500.00",
      liked: false,
      new: true,
    },
    {
      title: "DC Power Supply Variable, 120V 3A Bench Power Supply",
      img: PowerSupply,
      price: "₦85,000.00",
      star: "3.5",
      discount: "₦105,000.00",
      liked: true,
      new: false,
    },
    {
      title: "NE555 Timer IC",
      img: NE555,
      price: "₦100.00",
      star: "3.5",
      discount: "₦200.00",
      liked: true,
      new: true,
    },
    {
      title: "Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter",
      img: Zoyi,
      price: "₦25,000.00",
      star: "3.5",
      discount: "₦27,500.00",
      liked: false,
      new: true,
    },
  ];

  
  return (
    <div className=" my-5 md:mx-[10%] p-5  rounded-lg">
      <h1 className="font-bold text-xl mb-4 ">Top selling items</h1>
      <ScrollShadow className="w-full  " hideScrollBar offset={100} orientation="horizontal" size={20}>
        <div className="gap-4 w-fit flex ">
          {list.map((item, index) => (
            <Badge
              content="new"
              className="bg-primary text-white "
              size="sm"
              isInvisible={!item.new}
              placement="top-left"
            >
              <Card
                shadow="sm"
                radius="none"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
                className="w-[16em]"
              >
                <CardBody className="overflow-visible p-0 bg-neutral ">
                  <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white  ">
                    {item.liked ? (
                      <GoHeartFill size={20} className="text-danger" />
                    ) : (
                      <GoHeart size={20} className="hover:text-danger " />
                    )}
                  </div>
                  <img alt={item.title} className="w-full object-contain h-[10em]" src={item.img} />
                </CardBody>
                <CardFooter className="text-small text-left flex flex-col gap-1 items-start ">
                  <b className=" ">{item.title}</b>
                  <div className="flex items-center gap-2">
                    {" "}
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
