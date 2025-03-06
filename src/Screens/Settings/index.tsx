import React, { useState } from "react";
import Button from "../../components/Button/Button";
import InputField from "@/components/InputField"; // Assuming InputField is in this path

interface SettingProps {}

interface PasswordData {
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}

const Settings: React.FC<SettingProps> = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Use name instead of id
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value, // Use name to update the state
    }));
  };

  const handleSubmit = () => {
    console.log("Updating password with data:", passwordData);
  };
  const handleDeleteAccount = () => {
    console.warn("Delete account functionality not implemented!");
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
            name="currentpassword" // Use the name attribute for easier handling
            placeholder="Current Password"
            value={passwordData.currentpassword}
            onChange={handleChange}
            required={true}
          />

          {/* New Password InputField */}
          <InputField
            label="New Password"
            type="password"
            name="newpassword" // Use the name attribute for easier handling
            placeholder="New Password"
            value={passwordData.newpassword}
            onChange={handleChange}
            required={true}
          />

          {/* Confirm Password InputField */}
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmpassword" // Use the name attribute for easier handling
            placeholder="Confirm Password"
            value={passwordData.confirmpassword}
            onChange={handleChange}
            required={true}
          />

          <div className="flex justify-end mt-5">
            <Button
              className="bg-indigo-800 text-white py-2 px-4 rounded-md"
              onClick={handleSubmit}
            >
              Change Password
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
