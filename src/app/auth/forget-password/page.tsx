"use client";

import ForgotPasswordForm from "@/Screens/ForgetPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();

  const setIsForgotPassword = (value: boolean) => {
    router.push("/auth/signin");
  };

  return (
    <div className="bg-gray-900 max-h-auto min-h-screen flex justify-center items-center">
      <div className="shadow-lg bg-gray-800 lg:p-5 p-4 lg:m-10 m-3 rounded-[30px] grid grid-cols-1 justify-center items-center w-full lg:w-[700px] lg:max-w-[700px]">
        <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />
      </div>
    </div>
  );
};

export default ForgotPassword;
