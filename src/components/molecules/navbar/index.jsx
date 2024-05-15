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
import { BiFilter, BiMenu, BiSearch, BiX } from "react-icons/bi";
import { FiBell, FiMail, FiMessageSquare, FiShoppingCart } from "react-icons/fi";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
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

  return (
    <div>
      <Navbar disableAnimation className="md:py-2  ">
        <NavbarContent className="md:hidden sm:flex gap-4">
          <NavbarMenuToggle
            icon={isMenuOpen ? <BiX /> : <BiMenu />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className=" text-4xl cursor-pointer "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <NavbarBrand>
            <p className="font-bold text-secondary ">Electro Hub.</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="sm:flex gap-4" justify="start">
          <NavbarBrand>
            <p className="font-bold  hidden md:flex text-lg md:text-xl text-secondary ">Electro Hub.</p>
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
            startContent={<BiSearch size={18} />}
            type="search"
          />
        </NavbarContent>

        <NavbarContent as="div" className="items-center w-fit md:gap-3 gap-1 " justify="end">
          <NavbarItem className=" hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center ">
            <BiSearch size={18} className=" md:hidden flex" />
          </NavbarItem>
          <NavbarItem className=" hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center ">
            <FiShoppingCart className="text-lg cursor-pointer " />
          </NavbarItem>
          <NavbarItem className=" hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center ">
            <Badge content="" color="danger" size="sm" shape="circle" placement="top-right">
              <FiBell className="text-lg cursor-pointer " />
            </Badge>
          </NavbarItem>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                // isBordered
                as="button"
                className="transition-transform"
                color="secondary"
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

      <div className=" shadow border-b border-default-300 bg-white md:px-[14%] px-[5%] py-1 flex items-center justify-between ">
        <div className="flex  items-center text-sm md:gap-20 gap-4 ">
          <div className="border-r md:pr-10">
            <Select
              placeholder="Categories"
              size="xs"
              startContent={<BiFilter size={25} />}
              className="w-[10em] bg-opacity-0 "
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

        <div className="flex">
          <p className=" text-danger text-xs cursor-pointer ">Special offer</p>
        </div>
      </div>
    </div>
  );
}
