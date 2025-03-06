import React from "react";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";

interface NavbarProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onToggle: () => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, onToggle, isOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownItems = [
    {
      label: "Profile",
      id: "profile",
      icon: "/svgs/profile-icon.svg",
      href: "/profile",
    },
    {
      label: "Settings",
      id: "settings",
      icon: "/svgs/settings-icon.svg",
      href: "/settings",
    },
    {
      label: "Sign out",
      id: "signout",
      icon: "/svgs/signout-icon.svg",
      href: "#",
    },
  ];

  const hamburgerIcon = isOpen ? "/svgs/close-icon.svg" : "/svgs/menu-icon.svg";

  return (
    <nav className="bg-gray-900 w-full flex items-center justify-between h-[10vh] px-2 lg:px-5 text-white fixed top-0 z-40">
      <div className="flex flex-row items-center">
        <Button className="pr-3 block lg:hidden" onClick={onToggle}>
          <Image src={hamburgerIcon} alt="Humber Menu" width={25} height={25} />
        </Button>

        <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <Image
            width={50}
            height={50}
            src="/svgs/logo.png"
            className=""
            alt="Logo"
          />
          <span className="text-mediumn hidden lg:block font-semibold whitespace-nowrap text-white">
            TENANT MANAGEMENT SYSTEM
          </span>
        </a>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <Image
            width={30}
            height={30}
            src={user.avatar}
            className="rounded-full"
            alt={user.name}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-white">
                {user.name}
                <div className="text-xs text-gray-300">{user.email}</div>
              </div>
              {dropdownItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block flex flex-row gap-3 px-4 py-2 text-sm text-white hover:bg-gray-600"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
