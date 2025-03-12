import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import InputField from "@/components/InputField";
import { ChangePassword } from "@/components/ApiComponent"; // Import your API function
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface SettingProps {}

interface PasswordData {
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}

const Settings: React.FC<SettingProps> = () => {
  const { data: session, status } = useSession();
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id || !session?.token) {
      console.warn(
        "User ID or token not available. Ensure user is authenticated."
      );
    }
  }, [session?.user?.id, session?.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!session?.user?.id || !session?.token) {
      toast.error("User ID or token not available. Please log in.");
      return;
    }

    if (passwordData.newpassword !== passwordData.confirmpassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await ChangePassword(
        session?.user?.id,
        passwordData.currentpassword,
        passwordData.newpassword,
        passwordData.confirmpassword,
        session?.token
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setPasswordData({
          currentpassword: "",
          newpassword: "",
          confirmpassword: "",
        });
      } else {
        toast.error(
          `Password update failed: ${response.data?.message || "Unknown error"}`
        );
      }
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error(
        `Password update failed: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    console.warn("Delete account functionality not implemented!");
    toast.error("Delete account functionality not implemented!");
  };

  return (
    <div className="bg-gray-800 flex flex-col gap-5 rounded-xl min-h-screen py-6 px-3 sm:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-2">
            Change Password
          </h2>
          <p className="text-sm text-neutral-500">
            Update your password associated with your account.
          </p>
        </div>
        <div className="lg:col-span-2">
          {/* Current Password InputField */}
          <InputField
            label="Current Password"
            type="password"
            name="currentpassword"
            placeholder="Current Password"
            value={passwordData.currentpassword}
            onChange={handleChange}
            required={true}
          />

          {/* New Password InputField */}
          <InputField
            label="New Password"
            type="password"
            name="newpassword"
            placeholder="New Password"
            value={passwordData.newpassword}
            onChange={handleChange}
            required={true}
          />

          {/* Confirm Password InputField */}
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={passwordData.confirmpassword}
            onChange={handleChange}
            required={true}
          />

          <div className="flex justify-end mt-5">
            <Button
              className="bg-indigo-800 text-white py-2 px-4 rounded-md"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-2">
            Delete account
          </h2>
          <p className="text-sm text-neutral-500">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="flex  justify-start">
            <Button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              Yes, delete my account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
