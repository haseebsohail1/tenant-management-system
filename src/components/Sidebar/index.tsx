// components/Sidebar.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  active: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, active }) => {
  const sidebarClasses = `h-[90vh] bg-gray-900 text-white w-64 flex-shrink-0 transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0 fixed top-[10vh] left-0 z-40`;

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: "/svgs/dashboard-icon.svg",
    },
    {
      id: "properties",
      label: "Properties",
      href: "/properties",
      icon: "/svgs/propery-icon.svg",
    },
    {
      id: "units",
      label: "Units",
      href: "/units",
      icon: "/svgs/unit-icon.svg",
    },
    {
      id: "tenants",
      label: "Tenants",
      href: "/tenants",
      icon: "/svgs/tenant-icon.svg",
    },
    {
      id: "documents",
      label: "Documents",
      href: "/documents",
      icon: "/svgs/documents-icon.svg",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-[10vh] left-0 w-full h-[90vh] bg-gray-800 opacity-50 lg:hidden z-30"
          onClick={onToggle}
        />
      )}
      <div className={sidebarClasses}>
        <div className="mt-6 px-4 grid grid-col gap-3">
          {navItems.map((item) => (
            <Link href={item.href} key={item.id}>
              <span
                className={`flex items-center p-2 space-x-3 rtl:space-x-reverse hover:bg-gray-700 rounded-md ${
                  active === item.id ? "bg-gray-700 text-yellow-300" : ""
                }`}
              >
                {" "}
                <Image
                  alt={item.label}
                  src={item.icon}
                  width={20}
                  height={20}
                  className="text-white"
                />
                <span className="text-sm">{item.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
