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
import { useEffect, useState } from "react";
import truck from "../../../assets/image/truck.png";
import logo from "../../../assets/image/logo.svg";
import { useDispatch, useSelector } from "react-redux"; 
import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  BellIcon,
  HeartIcon,
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
import axios from "axios";
import {  logout } from "../../../redux/auth";
import CartModal from "../../CartModal";
import { toast } from "react-toastify";

export default function Nav({ onClick, darkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth); 
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


  const categorys = [
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



  const logoutSuccess = () => {    
    dispatch(logout());
    toast.success("logged out successfully")

  };

 

  const handleLogin = () => {
   
    navigate("/auth/login");
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

        <NavbarContent className="sm:flex gap-4 hidden " justify="start">
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
                color="neutral"
                showFallback
                name={user?.name}
                size="sm"
                src={user?.picture}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>

              <DropdownItem key="settings">My Account</DropdownItem>
              <DropdownItem key="settings">Orders</DropdownItem>
              <DropdownItem key="help_and_feedback">Saved Items</DropdownItem>
              {user.isAuthenticated ? (
                <DropdownItem key="logout" color="danger" onClick={logoutSuccess}>
                  Log Out
                </DropdownItem>
              ) : (
                <DropdownItem key="logout" onClick={handleLogin}>
                  Log In
                </DropdownItem>
              )}
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
                onClick={() => {
                  if (item === "Log Out") {
                    logoutSuccess();
                  }
                }}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className=" shadow border-b border-default-300 bg-white dark:bg-darkbg text-default-600 md:px-[14%] px-[6%] py-1 flex items-center justify-between ">
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
              {categorys.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
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

        <div className="md:flex gap-2 cursor-default">
          <div className="md:w-[6em] w-[3em] md:relative absolute md:right-0 right-6 ">
            <img src={truck} alt="" className="w-full h-full " />
          </div>
          <div className="w-fit">
            <p className="text-sm text-primary  ">Free Delivery</p>
            <p className="text-xs">For all orders above ₦100,000</p>
          </div>
        </div>

       <CartModal   isCartOpen={isCartOpen} handleCart={handleCart}     cartItems={cartItems}    />
      
      </div>
    </>
  );
}

 
  