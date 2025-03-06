"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useState, ChangeEvent } from "react";
import InputField from "@/components/InputField";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "landlord" | "tenant";
}

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "tenant",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="lg:px-5 flex flex-col justify-center">
      <div className="mb-3 flex flex-col">
        <div className="text-white text-[30px] font-semibold">
          Create An Account
        </div>
        <div className="text-base font-normal text-white ">
          Already have an account?
          <span
            className="pl-2 text-indigo-600 cursor-pointer"
            onClick={() => router.push("/auth/signin")}
          >
            Log In
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
          <InputField
            label="Name"
            name="name"
            type="text"
            required={true}
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            required={true}
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
          <InputField
            label="Email"
            name="email"
            required={true}
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            required={true}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="role"
            className="block text-mediumn font-medium text-neutral-100 mb-1"
          >
            Role <span className="text-red-500">&nbsp;*</span>
          </label>
          <select
            id="role"
            name="role"
            className="w-full rounded-md bg-gray-700 text-white rounded-md p-3 focus:outline-none  focus:none"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>

        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            name="terms_condition"
            id="terms_condition"
            className="h-4 w-4 text-indigo-600 focus:none border-gray-300 rounded"
          />
          <label
            htmlFor="terms_condition"
            className="ml-2 block text-mediumn text-white"
          >
            I agree to the terms & conditions
          </label>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            className="w-full h-[50px] flex justify-center items-center px-3 border border-transparent rounded-md shadow-sm text-medium font-medium text-white bg-indigo-700 focus:outline-none focus:none"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up Your Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
