import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownItem,
  Badge,
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import truck from "../../../assets/image/truck.png";
import logo from "../../../assets/image/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  BellAlertIcon,
  BellIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  ShoppingCartIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/auth";
import CartModal from "../../CartModal";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCartEP, fetchCategoriesEP, fetchNotificationsEP, fetchProductsEP } from "../../../services";
import { TimeAgo } from "react-datetime-ago";
import Markdown from "react-markdown";

export default function Nav({ onClick, darkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const menuItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About us",
      href: "/about-us",
    },
    {
      title: "Contact us",
      href: "/contact-us",
    },
    {
      title: "My Account",
      href: "/my-account",
    },
  ];

  //
  const { mutateAsync } = useMutation({
    mutationFn: (data) => addCartEP(data, user.id),
  });

  //  function to handle the form submission
  const submitHandler = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    submitHandler(cartItems?.cartItems);
  }, [isCartOpen === true]);

  isCartOpen && console.log(cartItems?.cartItems);

  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategoriesEP,
  });
  const {data:notifications } = useQuery({
    queryKey: ["notifications", user.id],
    queryFn: () => fetchNotificationsEP(user.id),
    onSuccess: (data) => {
      // setNotifications(data);
    }
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
  });

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const logoutSuccess = () => {
    dispatch(logout());
    toast.success("logged out successfully");
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // Check for Enter key press
      setSearchTerm(event.target.value);
      searchProducts(searchTerm); // Call the provided onSearch function with searchTerm
    }
  };

  const searchProducts = (searchTerm) => {
    const results = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return navigate(`/search?query=${searchTerm}`, { state: { results } });
  };
  console.log(notifications);

  return (
    <>
      <Navbar className="md:py-2 -py-1 dark:bg-darkbg text-default-600 " position="sticky">
        <NavbarContent className="md:hidden sm:flex ">
          <NavbarMenuToggle
            icon={isMenuOpen ? <XMarkIcon className="size-4" /> : <Bars3Icon className="size-4" />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className=" text-4xl cursor-pointer "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {!isSearchOpen ? (
            <NavbarBrand>
              <Link to="/">
                <img src={logo} alt="" className=" h-6" />
              </Link>
            </NavbarBrand>
          ) : (
            <Input
              classNames={{
                base: " w-[10em] h-10 ",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-white/80 dark:bg-default-500/20",
              }}
              variant="bordered"
              placeholder="Search product..."
              radius="none"
              size="sm"
              onKeyDown={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<MagnifyingGlassIcon className="size-4" />}
              type="search"
            />
          )}
        </NavbarContent>

        <NavbarContent className="sm:flex gap-4 hidden " justify="start">
          <Link to="/">
            <NavbarBrand>
              <img src={logo} alt="" className=" h-8  mr-1 block " />
              <h1 className=" text-primary font-bold ">Electro hub</h1>
            </NavbarBrand>
          </Link>
        </NavbarContent>
        <NavbarContent justify="center" className="w-[30em] hidden md:flex ">
          <Input
            classNames={{
              base: " w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-white/80 dark:bg-default-500/20",
            }}
            variant="bordered"
            placeholder="Search product..."
            radius="none"
            size="sm"
            onKeyDown={handleSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={<MagnifyingGlassIcon className=" size-5 " />}
            type="search"
          />
        </NavbarContent>

        <NavbarContent as="div" className="items-center w-fit md:gap-3 gap-1 " justify="end">
          {!isSearchOpen ? (
            <NavbarItem className=" md:hidden hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center ">
              <MagnifyingGlassIcon className=" md:hidden flex size-4 " onClick={() => setIsSearchOpen(true)} />
            </NavbarItem>
          ) : null}
          <NavbarItem
            className=" hover:bg-default-200 rounded-full  ease-in-out duration-200 flex items-center cursor-pointer"
            onClick={onClick}
          >
            {darkMode ? (
              <SunIcon className="md:size-5 size-4 hidden md:block text-default-800 m-1 hover:text-primary hover:size-7 transform ease-in-out duration-250 " />
            ) : (
              <MoonIcon className="md:size-5 size-4 hidden md:block text-default-800 m-1 hover:text-primary hover:size-7 transform ease-in-out duration-250 " />
            )}
          </NavbarItem>
          <NavbarItem className=" hover:bg-default-200 rounded-full  ease-in-out duration-200 flex items-center cursor-pointer ">
            <Popover placement="bottom">
              <PopoverTrigger>
                <Badge
                  content={notifications && (notifications?.find((notification) => !notification.isRead) ? "" : null)}
                  color="danger"
                  size="sm"
                  shape="circle"
                  placement="top-right"
                >
                  <PopoverTrigger>
                    <BellAlertIcon className="md:size-5 size-4 m-1 hover:text-primary hover:size-7 transform ease-in-out duration-250  " />
                  </PopoverTrigger>
                </Badge>
              </PopoverTrigger>
              <PopoverContent className=" rounded-lg border ">
                {(titleProps) => (
                  <div className="px-1 py-4 ">
                    <h3 className="text-md font-bold pb-4 pl-2  " {...titleProps}>
                      Notifications 📢
                    </h3>
                    <div className="text-tiny h-[18.125rem] scrollbar-hide overflow-auto">
                      {/* contents */}

                      <ul className=" ">
                        {notifications?.map((item, index) => (
                          <li
                            key={index}
                            className={`
                                cursor-pointer border-b md:w-[25rem] w-[18.75rem] hover:bg-primary hover:text-white p-2 bg-white/80   ${
                                  item.isRead ? "text-gray-400" : "text-gray-800"
                                } `}
                            onClick={() => {
                              navigate(`/order/${item.shortId}`);
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className=" font-semibold"> {item.title}</h3>
                              <span className=" text-[.625rem] font-semibold ">
                                <TimeAgo date={item.createdAt} />
                              </span>
                            </div>
                            <Markdown>{item.message}</Markdown>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </NavbarItem>
          <NavbarItem className=" hover:bg-default-200 rounded-full  mr-2 ease-in-out duration-200 flex items-center cursor-pointer">
            <div className=" w-fit h-fit flex items-center " onClick={handleCart}>
              <Badge
                content={cartItems?.cartTotalQuantity}
                shape="circle"
                color="danger"
                size="sm"
                placement="top-right"
              >
                <ShoppingCartIcon className="md:size-5 size-4 m-1 hover:text-primary hover:size-7 transform ease-in-out duration-250  " />
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
                src={user.profilePicture ? user?.profilePicture[0]?.url : ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>

              <DropdownItem key="settings">
                <Link to="my-account">My Account</Link>
              </DropdownItem>
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
                color={index === 1 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"}
                to={item.href}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className=" shadow border-b border-default-300 bg-white/80 dark:bg-darkbg text-default-600 md:px-[14%] px-[6%] py-1 flex  items-center justify-between ">
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
              {categories?.map((item) => (
                <SelectItem key={item?.id} value={item?.name}>
                  {item?.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex mx-auto gap-6 ">
          <Link to="/about-us" className=" cursor-pointer hidden md:block ">
            About
          </Link>
          <Link to="/contact-us" className=" cursor-pointer hidden md:block ">
            Contact 
          </Link>
        </div>

        <div className="md:flex gap-2 cursor-default">
          <div className="md:w-[6em] w-[3em] md:relative absolute md:right-0 right-6 ">
            <img src={truck} alt="" className="w-full h-full " />
          </div>
          <div className="w-fit md:mr-0 mr-6 ">
            <p className="md:text-sm text-xs text-primary  ">Free Delivery</p>
            <p className="text-xs flex flex-col md:flex-row ">For all orders above <span className="">
              ₦100,000
            </span>
            </p>
          </div>
        </div>

        <CartModal isCartOpen={isCartOpen} handleCart={handleCart} cartItems={cartItems} />
      </div>
    </>
  );
}
