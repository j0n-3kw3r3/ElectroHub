import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownItem,
  Badge,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import truck from "../../../assets/image/truck.png";
import logo from "../../../assets/image/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, deleteFromCart } from "../../../redux/cartSlice";
import { formatCurrency } from "../../../utils/formatter";
import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  MoonIcon,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Nav({ onClick, darkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const menuItems = [
    "Home",
    "About us",
    "Contact us",
    "Products",
    "Business",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const animals = [
    { label: "Capacitor", value: "Capacitor", description: "" },
    { label: "Resistor", value: "Resistor", description: "" },
    { label: "Inductor", value: "Inductor", description: "" },
    { label: "Transistor", value: "Transistor", description: "" },
    { label: "Diode", value: "Diode", description: "" },
    { label: "IC", value: "IC", description: "" },
    { label: "Crystal", value: "Crystal", description: "" },
    { label: "LED", value: "LED", description: "" },
    { label: "Fuse", value: "Fuse", description: "" },
    { label: "Switch", value: "Switch", description: "" },
    { label: "Connector", value: "Connector", description: "" },
    { label: "Relay", value: "Relay", description: "" },
    { label: "Arduino", value: "Arduino", description: "" },
    { label: "Raspberry Pi", value: "Raspberry Pi", description: "" },
    { label: "Sensor", value: "Sensor", description: "" },
    { label: "Module", value: "Module", description: "" },
    { label: "Display", value: "Display", description: "" },
    { label: "Motor", value: "Motor", description: "" },
    { label: "Battery", value: "Battery", description: "" },
    { label: "Tools", value: "Tools", description: "" },
    { label: "Miscellaneous", value: "Miscellaneous", description: "" },
  ];

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
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
  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar className="md:py-2 dark:bg-darkbg text-default-600 " position="sticky">
        <NavbarContent className="md:hidden sm:flex ">
          <NavbarMenuToggle
            icon={isMenuOpen ? <XMarkIcon className="size-4" /> : <Bars3Icon className="size-4" />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className=" text-4xl cursor-pointer "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {!isSearchOpen ? (
            <NavbarBrand>
              <img src={logo} alt="" className=" h-20" />
            </NavbarBrand>
          ) : (
            <Input
              classNames={{
                base: " w-[10em] h-10 ",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-white dark:bg-default-500/20",
              }}
              variant="bordered"
              placeholder="Search product..."
              radius="none"
              size="sm"
              startContent={<MagnifyingGlassIcon className="size-4" />}
              type="search"
            />
          )}
        </NavbarContent>

        <NavbarContent className="sm:flex gap-4" justify="start">
          <NavbarBrand>
            <img src={logo} alt="" className=" h-8  mr-1 block " />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center" className="w-[30em] hidden md:flex ">
          <Input
            classNames={{
              base: " w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-white dark:bg-default-500/20",
            }}
            variant="bordered"
            placeholder="Search product..."
            radius="none"
            size="sm"
            startContent={<MagnifyingGlassIcon className=" size-5 " />}
            type="search"
          />
        </NavbarContent>

        <NavbarContent as="div" className="items-center w-fit md:gap-3 gap-1 " justify="end">
          {!isSearchOpen ? (
            <NavbarItem className=" hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center ">
              <MagnifyingGlassIcon className=" md:hidden flex size-5 " onClick={() => setIsSearchOpen(true)} />
            </NavbarItem>
          ) : null}
          <NavbarItem
            className=" hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center cursor-pointer"
            onClick={onClick}
          >
            {darkMode ? (
              <SunIcon className="size-5 text-default-800 " />
            ) : (
              <MoonIcon className="size-5 text-default-800" />
            )}
          </NavbarItem>
          <NavbarItem className=" hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center cursor-pointer">
            <Badge content="" color="danger" size="sm" shape="circle" placement="left">
              <BellIcon className="size-6 " />
            </Badge>
          </NavbarItem>
          <NavbarItem className=" hover:bg-default-200 rounded-full p-2 mr-2 ease-in-out duration-200 flex items-center cursor-pointer">
            <div className=" w-fit h-fit flex items-center " onClick={handleCart}>
              <Badge
                content={cartItems?.cartTotalQuantity}
                shape="circle"
                color="danger"
                size="sm"
                placement="top-right"
              >
                <ShoppingCartIcon className="size-6  " />
              </Badge>
            </div>
          </NavbarItem>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                // isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"}
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className=" shadow border-b border-default-300 bg-white dark:bg-darkbg text-default-600 md:px-[14%] px-[5%] py-1 flex items-center justify-between ">
        <div className="flex  items-center text-sm md:gap-20 gap-4 ">
          <div className="border-r border-default-400 md:pr-10">
            <Select
              placeholder="Categories"
              size="xs"
              startContent={<AdjustmentsHorizontalIcon className="size-4" />}
              className="w-[10em]  bg-opacity-0 "
              variant="underlined"
              color="primary"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-6 ">
            <div className=" cursor-pointer hidden md:block ">Home</div>
            <div className=" cursor-pointer hidden md:block ">About us</div>
            <div className=" cursor-pointer hidden md:block ">Contact us</div>
          </div>
        </div>

        <div className="md:flex gap-2   ">
          <div className="md:w-[6em] w-[3em] md:relative absolute md:right-0 right-6 ">
            <img src={truck} alt="" className="w-full h-full " />
          </div>
          <div className="w-fit">
            <p className="text-sm text-primary  ">Free Delivery</p>
            <p className="text-xs">For all orders above ₦100,000</p>
          </div>
        </div>

        {isCartOpen && (
          <div
            className="fixed  top-0  left-0 w-full h-full bg-[#1f1f1f8c] z-50 backdrop-blur-[2px]  "
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
                    <div key={index} className="border-b border-default-600 flex  items-center gap-4 p-4 ">
                      <div className="flex flex-grow gap-4 ">
                        <div className="w-[60px] h-[50px] bg-neutral rounded overflow-hidden border border-default-200 ">
                          <img src={item?.img[0]} alt="" className=" w-full h-full object-contain " />
                        </div>
                        <div className="flex-grow text-sm">
                          <div className="truncate  text-ellipsis overflow-hidden w-[200px] text-default-500  ">
                            {item?.title}
                          </div>
                          <div className="flex gap-2 items-center">
                            <p className=" ">{formatCurrency(parseInt(item.price))}</p>
                            <p className="text-danger text-xs line-through ">
                              {formatCurrency(parseInt(item.discount))}
                            </p>
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
                      navigate("/auth/login");
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
        )}
      </div>
    </>
  );
}

