"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useState, ChangeEvent } from "react";
import InputField from "@/components/InputField";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const SigninForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [passwordResetSuccess, setPasswordResetSuccess] =
    useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res: any = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error == null) {
      toast.success("Login Successful");
      router.push("/dashboard");
    } else {
      console.error("Sign-in error:", res.error);
      toast.error(res.error || "Failed to sign in");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password reset email sent!");
        setResetToken(data.resetToken); // Assuming the API returns the reset token
        setIsForgotPassword(true);
      } else {
        toast.error(data.error || "Failed to request password reset.");
        console.error("Forgot password error:", data.error);
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
          resetToken: resetToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password reset successfully!");
        setPasswordResetSuccess(true);
        setIsForgotPassword(false); // Go back to the sign-in form
        setFormData({
          email: "",
          password: "",
          newPassword: "",
          confirmPassword: "",
        }); // Clear form
        setResetToken(null);
      } else {
        toast.error(data.error || "Failed to reset password.");
        console.error("Reset password error:", data.error);
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!isForgotPassword) {
      return handleSignIn;
    } else if (resetToken) {
      return handleResetPassword;
    } else {
      return handleForgotPassword;
    }
  };

  const getFormTitle = () => {
    if (!isForgotPassword) {
      return "Welcome Back, John";
    } else if (resetToken) {
      return "Change Password";
    } else {
      return "Reset Password";
    }
  };

  const getFormSubtitle = () => {
    if (!isForgotPassword) {
      return (
        <>
          Don’ have an account?
          <span
            className="pl-2 text-indigo-700 cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </span>
        </>
      );
    } else if (resetToken) {
      return "Enter your new password.";
    } else {
      return "Enter your email address to reset your password.";
    }
  };

  return (
    <div className="lg:px-5 flex flex-col justify-center">
      <div className="flex flex-col mb-5">
        <div className="text-white text-[30px] font-semibold">
          {getFormTitle()}
        </div>
        <div className="text-mediumn font-normal text-white">
          {getFormSubtitle()}
        </div>
      </div>
      <form onSubmit={handleSubmit()}>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <InputField
              label="Email"
              name="email"
              required={true}
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {!isForgotPassword && !resetToken && (
            <div className="col-span-12 ">
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
          )}

          {isForgotPassword && resetToken && (
            <>
              <div className="col-span-12">
                <InputField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  required={true}
                  placeholder="Enter New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-12">
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  required={true}
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="col-span-12 flex items-center mt-2">
            <input
              type="checkbox"
              name="terms_condition"
              id="terms_condition"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms_condition"
              className="ml-2 block mediumn text-white"
            >
              I agree to the terms & conditions
            </label>
          </div>

          {!isForgotPassword && !resetToken && (
            <div className="col-span-12">
              <div
                className="text-[#ff0000] underline text-mediumn font-normal flex justify-end items-center gap-2 cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot Password?
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            className="mt-8 w-full h-[50px] flex justify-center items-center px-3 border border-transparent rounded-md shadow-sm text-medium font-medium text-white bg-indigo-700 focus:outline-none focus:none"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isForgotPassword && !resetToken
              ? "Send Reset Link"
              : isForgotPassword && resetToken
              ? "Reset Password"
              : "Sign In Your Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
