// components/Sidebar.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const sidebarClasses = `h-[90vh] bg-gray-900 text-white w-64 flex-shrink-0 transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0 fixed top-[10vh] left-0 z-40`;

  const navItemsLandlord: NavItem[] = [
    {
      id: "properties",
      label: "Properties",
      href: "/all-properties",
      icon: "/svgs/propery-icon.svg",
    },
    {
      id: "units",
      label: "Units",
      href: "/all-units",
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
    {
      id: "bookings",
      label: "Bookings",
      href: "/bookings",
      icon: "/svgs/documents-icon.svg",
    },
  ];

  const navItemsTenant: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: "/svgs/dashboard-icon.svg",
    },
  ];

  const navItemsAdmin: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: "/svgs/dashboard-icon.svg",
    },
    {
      id: "users",
      label: "Users",
      href: "/admin-users",
      icon: "/svgs/users-icon.svg",
    },
    {
      id: "properties",
      label: "Properties",
      href: "/all-properties",
      icon: "/svgs/propery-icon.svg",
    },
  ];

  let userRole = null;
  if (session?.user?.role) {
    userRole = session.user.role;
  }

  let navItems: NavItem[] = [];

  switch (userRole) {
    case "Admin":
      navItems = navItemsAdmin;
      break;
    case "Landlord":
      navItems = navItemsLandlord;
      break;
    case "Tenant":
      navItems = navItemsTenant;
      break;
    default:
      null;
  }

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
          {session && (
            <div className="text-sm text-yellow-300 font-semibold">
              {userRole === "Admin"
                ? "Admin"
                : userRole === "Landlord"
                ? "Landlord"
                : userRole === "Tenant"
                ? "Tenant"
                : ""}
            </div>
          )}
          {navItems.map((item) => (
            <Link href={item.href} key={item.id}>
              <span
                className={`flex items-center p-2 space-x-3 rtl:space-x-reverse hover:bg-gray-700 rounded-md ${
                  active === item.id ? "bg-gray-700 text-yellow-300" : ""
                }`}
              >
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
