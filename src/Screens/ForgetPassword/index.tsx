"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ForgotPassword } from "@/components/ApiComponent";

interface ForgotPasswordFormProps {
  setIsForgotPassword: (isForgotPassword: boolean) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  setIsForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: any = await ForgotPassword(email);

      if (response.status === 200) {
        toast.success(
          response.data.message || "Password reset link sent to your email."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:p-5 flex flex-col justify-center">
      <div className="flex flex-col mb-5">
        <div className="text-white text-[30px] font-semibold">
          Forget Password
        </div>
        <div className="text-sm font-normal text-white">
          Enter your email address and we'll send you a link to reset your
          password.
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="mt-5 w-full h-[50px] flex justify-center items-center px-3 border border-transparent rounded-md shadow-sm text-medium font-medium text-white bg-yellow-600 focus:outline-none focus:none"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      <div
        className="text-white text-sm font-normal flex justify-center mt-3 cursor-pointer"
        onClick={() => setIsForgotPassword(false)}
      >
        Back to Login
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
