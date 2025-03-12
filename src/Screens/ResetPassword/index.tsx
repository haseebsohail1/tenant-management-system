"use client";

import { useState, useEffect } from "react"; // Import useEffect
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPassword } from "@/components/ApiComponent";

interface ResetPasswordFormProps {
  setIsForgotPassword: (isForgotPassword: boolean) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  setIsForgotPassword,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token.");
      router.push("/auth/signin");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!token) {
      toast.error("Missing token.  Please try again.");
      return;
    }

    setLoading(true);

    console.log("Reset Token:", token);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    try {
      if (typeof token === "string") {
        const response: any = await ResetPassword(
          token,
          newPassword,
          confirmPassword
        );
        if (response.status === 200) {
          toast.success(
            response.data.message || "Password reset successfully!"
          );
          setIsForgotPassword(false);
          router.push("/auth/signin");
        }
      } else {
        toast.error("Invalid token.");
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
          Reset Password
        </div>
        <div className="text-sm font-normal text-white">
          Enter your new password.
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <InputField
          label="New Password"
          name="password"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="mt-8 w-full h-[50px] flex justify-center items-center px-3 border border-transparent rounded-md shadow-sm text-medium font-medium text-white bg-indigo-700 focus:outline-none focus:none"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
