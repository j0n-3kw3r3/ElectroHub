import { MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import logo from "../assets/image/logo.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/formatter";
import { Button } from "@nextui-org/button";
import { clearCart } from "../redux/cartSlice";
import { InputComponent } from "../components/InputComponent";
import { useState } from "react";

export default function Checkout() {
  const [next, setNext] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className=" h-screen ">
      <div className="flex px-[10%]  border-b py-3 items-center justify-between">
        {/* logo */}
        <Link to="/" className=" h-10 flex justify-center items-center gap-2 text-primary ">
          <img src={logo} alt="" className="w-10" />
          <h1 className=" font-bold">Electrohub</h1>
        </Link>
        <div className="">
          <h1 className="text-lg font-bold">Checkout</h1>
        </div>
      </div>
      <div className="  grid grid-cols-5  ">
        <div className="bg-white h-screen p-8 pb-32 overflow-auto scrollbar-hide col-span-3  ">
          <div className="  pl-[100px] ">
            <h1 className=" border-b pb-4 font-bold mb-6">Delivery Information</h1>
            <div className="max-w-md">
              {!next ? (
                <form className=" space-y-4">
                  <h1 className="text-lg uppercase font-bold mb-6">Delivery Address</h1>
                  <div className="flex space-x-4 w-full">
                    <InputComponent name="firstname" type="text" />
                    <InputComponent name="lastname" type="text" />
                  </div>
                  <InputComponent name="email" type="text" />
                  <InputComponent name="phone" type="tel" />
                  <InputComponent name="street" type="text" />
                  <InputComponent name="city" type="text" />
                  <div className="flex space-x-4 w-full">
                    <InputComponent name="state" type="text" />
                    <InputComponent name="postal code" type="text" />
                  </div>
                  <InputComponent name="country" type="text" />

                  <div className="">
                    <Button
                      className=" w-full bg-primary rounded-none text-white border font-semibold "
                      onClick={() => {
                        setNext(true);
                      }}
                    >
                      <ShoppingBagIcon className="size-4" />
                      Continue
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="">
                  <h1 className="text-lg uppercase font-bold mb-6">Payment Method</h1>
                  <form className=" space-y-4">
                    <InputComponent name="card number" type="text" />
                    <InputComponent name="expiration date" type="text" />
                    <InputComponent name="CVV" type="text" />
                    <InputComponent name="cardholder name" type="text" />

                    <div className="flex items-center space-x-2 ">
                      {/* terms and condition checkbox */}
                      <input type="checkbox" name="" id="" />
                      <p className=" text-sm "> I have read and agreed to the Terms and Conditions </p>
                    </div>
                    <div className="">
                      <Button
                        className="w-full bg-primary rounded-none text-white border font-semibold"
                        onClick={() => {}}
                      >
                        <ShoppingBagIcon className="size-4" />
                        Pay Now
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>{" "}
          </div>
        </div>
        <div className="bg-gray-100 p-10 h-screen p-8 pb-32 overflow-auto scrollbar-hide col-span-2 ">
          <h1 className=" font-bold text-center mb-4">Cart Summary</h1>
          <div className=" max-w-sm mx-auto border bg-white shadow-md w-full ">
            {cartItems?.cartItems?.map((item, index) => (
              <div key={index} className="border-b  flex items-center gap-4 p-4 ">
                <div className="flex flex-grow gap-4 ">
                  <div className="w-[60px] h-[50px] bg-neutral rounded overflow-hidden border border-default-200 ">
                    <img src={item?.images[0].url} alt="" className=" w-full h-full object-contain " />
                  </div>
                  <div className="flex-grow text-sm">
                    <div className="truncate  text-ellipsis overflow-hidden w-[200px] text-default-500  ">
                      {item?.name}
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className=" ">{formatCurrency(parseInt(item.price))}</p>
                      <p className="text-danger text-xs line-through ">{formatCurrency(parseInt(item.discount))}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-2  ">
                    <button className="text-primary bg-transparent border border-primary rounded-full  hover:bg-primary hover:text-white">
                      <PlusIcon className="size-4" onClick={() => handleAdd(item)} />
                    </button>
                    <p className="text-sm">{item?.cartQuantity}</p>
                    <button className="text-primary bg-transparent border border-primary rounded-full  hover:bg-primary hover:text-white">
                      <MinusIcon className="size-4" onClick={() => handleremove(item.id)} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="  space-y-2 p-4  pt-10  shadow-lg ">
              <div className="text-xs flex items-center justify-between ">
                <p className=" font-semibold ">Subtotal:</p>
                <h1 className="">{formatCurrency(parseInt(cartItems?.cartTotalAmount))}</h1>
              </div>
              <div className="text-xs flex items-center justify-between ">
                <p className=" font-semibold ">Shipping:</p>
                <h1 className="">{formatCurrency(parseInt(cartItems?.cartTotalAmount))}</h1>
              </div>
              <div className=" flex text-xs items-center justify-between ">
                <p className=" font-semibold">Discount:</p>
                <h1 className="">{formatCurrency(parseInt(cartItems?.cartTotalAmount))}</h1>
              </div>
              <div className=" flex items-center justify-between ">
                <p className=" font-bold">Total:</p>
                <h1 className="font-bold">{formatCurrency(parseInt(cartItems?.cartTotalAmount))}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
