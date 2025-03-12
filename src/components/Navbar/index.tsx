import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  userData: {
    name: any;
    email: any;
    avatar: any;
  };
  onToggle: () => void;
  isOpen: boolean;
}

interface DropdownItem {
  label: string;
  id: string;
  icon: string;
  href: string;
  onClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userData, onToggle, isOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    localStorage.clear();
    router.push("/auth/signin");
  };

  const dropdownItems: DropdownItem[] = [
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
      onClick: handleSignOut,
    },
  ];
  const userInitial = userData?.name?.charAt(0).toUpperCase() || "";
  const hamburgerIcon = isOpen ? "/svgs/close-icon.svg" : "/svgs/menu-icon.svg";

  return (
    <nav className="fixed top-0 z-40 flex w-full h-[10vh] items-center justify-between bg-gray-900 px-2 text-white lg:px-5">
      <div className="flex items-center">
        <Button className="pr-3 lg:hidden" onClick={onToggle}>
          <Image src={hamburgerIcon} alt="Menu" width={25} height={25} />
        </Button>

        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Image width={50} height={50} src="/svgs/logo.png" alt="Logo" />
          <span className="hidden font-semibold whitespace-nowrap text-white lg:block">
            TENANT MANAGEMENT SYSTEM
          </span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          {userData.name ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white font-bold">
              {userInitial}
            </div>
          ) : (
            <Image
              width={30}
              height={30}
              src={userData.avatar}
              className="rounded-full"
              alt={userData.name}
            />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 bg-gray-700">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-white">
                {userData.name}
                <div className="text-xs text-gray-300">{userData.email}</div>
              </div>
              {dropdownItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={item.onClick}
                  className="flex flex-row gap-3 px-4 py-2 text-sm text-white hover:bg-gray-600 block"
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
