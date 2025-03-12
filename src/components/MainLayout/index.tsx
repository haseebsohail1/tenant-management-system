// components/MainLayout.tsx
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
interface LayoutProps {
  children: React.ReactNode;
  active: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, active }) => {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const userData = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "guest@example.com",
    avatar: session?.user?.image || "/svgs/user-profile.png",
  };

  useEffect(() => {
    console.log("Session User:", session?.user);
  }, [session]);

  const contentAreaClasses = `p-2 lg:p-5 overflow-y-auto bg-gray-700 transition-all w-full lg:ml-64 lg:w-[calc(100% - 16rem)]`;

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <Navbar
        userData={userData}
        onToggle={toggleSidebar}
        isOpen={isSidebarOpen}
      />
      <div className="flex flex-row pt-[10vh] h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          active={active}
        />
        <div className={contentAreaClasses}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
