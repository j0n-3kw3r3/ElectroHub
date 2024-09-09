import {
  Button,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../utils/formatter";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { addToCart, clearCart, deleteFromCart } from "../redux/cartSlice";

export default function CartModal({
  isCartOpen,
  handleCart,
  cartItems,
}) {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
      const handleClear = () => {
        dispatch(clearCart());
      };


  return (
    <div
      className={isCartOpen ? `fixed  top-0  left-0 w-full h-full bg-[#1f1f1f8c] z-50 backdrop-blur-[2px]` : "hidden"}
      onClick={handleCart}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="  bg-white dark:bg-darkbg h-full absolute shadow-xl flex flex-col right-0 top-0 transition-transform translate-x-0 duration-[800s] delay-300 ease-in-out "
      >
        <div className=" w-full flex-grow overflow-y-auto  ">
          <div className="flex  top-0  relative items-center justify-between text-primary p-5 border-b shadow-md border-primary">
            <h1 className=" font-semibold">My Cart</h1>

            <XMarkIcon className="size-4 absolute top-5 right-5 cursor-pointer" onClick={handleCart} />
          </div>

          {cartItems.cartItems &&
            cartItems.cartItems.map((item, index) => (
              <div key={index} className="border-b border-default-600 flex items-center gap-4 p-4 ">
                <div className="flex flex-grow gap-4 ">
                  <div className="w-[60px] h-[50px] bg-neutral rounded overflow-hidden border border-default-200 ">
                    <img src={item?.images[0].url} alt="" className=" w-full h-full object-contain " />
                  </div>
                  <div className="flex-grow text-sm">
                    <div className="truncate  text-ellipsis overflow-hidden w-[200px] text-default-500  ">
                      {item?.title}
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
        </div>

        <div className="  space-y-2 p-4 pb-0 border-t shadow-lg border-primary">
          <div className=" w-[40%]">
            <p className=" text-xs">Subtotal:</p>
            <h1 className="font-bold">{formatCurrency(parseInt(cartItems?.cartTotalAmount))}</h1>
          </div>
          <div className="">
            <Button
              className=" w-full bg-primary rounded-none text-white border   font-semibold "
              onClick={() => {
                if (!user.isAuthenticated) navigate("/auth/login");
              }}
            >
              <ShoppingBagIcon className="size-4" />
              Checkout
            </Button>
            <Button variant="fade" className=" w-full  font-semibold " onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
