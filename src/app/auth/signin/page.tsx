"use client";
import withAuthProtection from "@/app/authGuard";
import SigninForm from "@/Screens/SigninForm";
import ImageCarousel from "@/components/SigninSignupImageCarousel";

const Signin = () => {
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
