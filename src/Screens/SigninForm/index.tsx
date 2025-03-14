"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res: any = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error == null) {
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        toast.error(res.error || "Failed to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:px-5 flex flex-col justify-center">
      <div className="flex flex-col mb-5">
        <div className="text-white text-[30px] font-semibold">Welcome Back</div>
        <div className="text-mediumn font-normal text-white">
          Don’t have an account?
          <span
            className="pl-2 text-yellow-500 cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>
      <form onSubmit={handleSignIn} className="flex flex-col gap-2">
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div
          className="text-white mt-3 underline text-medium font-normal flex justify-end cursor-pointer"
          onClick={() => router.push("/auth/forget-password")}
        >
          Forgot Password?
        </div>
        <Button
          type="submit"
          className="mt-8 w-full h-[50px] flex justify-center items-center px-3 border border-transparent rounded-md shadow-sm text-medium font-medium text-white bg-yellow-600 focus:outline-none focus:none"
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
