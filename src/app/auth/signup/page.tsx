"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useState, ChangeEvent, useEffect } from "react";
import InputField from "@/components/InputField";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import withAuthProtection from "@/app/authGuard";
import SignupForm from "@/Screens/SignupForm";
import ImageCarousel from "@/components/SigninSignupImageCarousel";

const Signup = () => {
  return (
    <>
      <div className="bg-gray-900 max-h-auto min-h-screen flex justify-center items-center">
        <div className="shadow-lg bg-gray-800 lg:p-5 p-4 lg:m-10 m-3 rounded-[30px] grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px]">
          <ImageCarousel />
          <SignupForm />
        </div>
      </div>
    </>
  );
};
export default withAuthProtection(Signup);
