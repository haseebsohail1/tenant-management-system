"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useState, FormEvent } from "react";
import InputField from "@/components/InputField";
import toast from "react-hot-toast";
import { Signup } from "@/components/ApiComponent";

interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "Landlord" | "Tenant";
}

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "Tenant",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null); // State for password error message
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[@$!%*?&]/.test(password)) {
      return "Password must contain at least one special character (@, $, !, %, *, ?, or &).";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }
    return null; // Password is valid
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const passwordErrorMessage = validatePassword(formData.password);
    if (passwordErrorMessage) {
      setPasswordError(passwordErrorMessage);
      return;
    } else {
      setPasswordError(null); // Clear the error if the password is valid
    }

    setLoading(true);
    try {
      const response = await Signup(formData);
      if (response.status === 200 || response.status === 201) {
        toast.success(
          "Signup successful! Please check your email for verification."
        );
        router.push("/auth/signin");
      } else {
        toast.error(`Signup failed: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "An error occurred.";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(`Signup failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

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
        {passwordError && (
          <div className="text-red-500 mt-1">{passwordError}</div>
        )}
        <div className="mt-5">
          <label
            htmlFor="role"
            className="block text-mediumn font-medium text-neutral-100 mb-1"
          >
            Role <span className="text-red-500"> *</span>
          </label>
          <select
            id="role"
            name="role"
            className="w-full rounded-md bg-gray-700 text-white rounded-md p-3 focus:outline-none  focus:none"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Tenant">Tenant</option>
            <option value="Landlord">Landlord</option>
          </select>
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
