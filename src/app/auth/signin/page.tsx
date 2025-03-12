"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import withAuthProtection from "@/app/authGuard";
import SigninForm from "@/Screens/SigninForm";
import ImageCarousel from "@/components/SigninSignupImageCarousel";

const Signin = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "authenticated") {
    return null;
  }

  return (
    <>
      <div className="bg-gray-900 max-h-auto min-h-screen flex justify-center items-center">
        <div className="shadow-lg bg-gray-800 lg:p-5 p-4 lg:m-10 m-3 rounded-[30px] grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px]">
          <ImageCarousel />
          <SigninForm />
        </div>
      </div>
    </>
  );
};

export default withAuthProtection(Signin);
