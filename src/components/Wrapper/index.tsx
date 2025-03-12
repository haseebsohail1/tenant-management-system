// components/Wrapper.tsx
"use client";
import React from "react";
import MainLayout from "@/components/MainLayout";

interface WrapperProps {
  children: React.ReactNode;
  active?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, active = "" }) => {
  return (
    <MainLayout active={active}>
      <div className="w-full">{children}</div>
    </MainLayout>
  );
};

export default Wrapper;
