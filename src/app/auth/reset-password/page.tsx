"use client";

import ResetPasswordForm from "@/Screens/ResetPassword";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSetIsForgotPassword = (value: boolean) => {
    setIsForgotPassword(value);
    router.push("/forgot-password");
  };

  return (
    <div className="bg-gray-900 max-h-auto min-h-screen flex justify-center items-center">
      <div className="shadow-lg bg-gray-800 lg:p-5 p-4 lg:m-10 m-3 rounded-[30px] grid grid-cols-1 justify-center items-center w-full lg:w-[700px] lg:max-w-[700px]">
        <ResetPasswordForm setIsForgotPassword={handleSetIsForgotPassword} />
      </div>
    </div>
  );
};

export default ResetPassword;
