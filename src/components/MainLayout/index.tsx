// components/MainLayout.tsx
"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  active: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, active }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const user = {
    name: "Neil Sims",
    email: "neil.sims@flowbite.com",
    avatar: "/svgs/user-profile.png",
  };

  const contentAreaClasses = `p-2 lg:p-5 overflow-y-auto bg-gray-700 transition-all w-full lg:ml-64 lg:w-[calc(100% - 16rem)]`;

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <Navbar user={user} onToggle={toggleSidebar} isOpen={isSidebarOpen} />
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
