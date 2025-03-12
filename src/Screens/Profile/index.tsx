import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../components/Button/Button";
import InputField from "@/components/InputField";
import { useSession } from "next-auth/react";

interface ProfileProps {}

interface UserData {
  fullName: string;
  phone: string;
  role: string;
  email: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    phone: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    if (session?.user) {
      setUserData({
        fullName: session.user.name || "",
        phone: session.user.phone || "",
        role: session.user.role || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const userInitial = userData?.fullName?.charAt(0).toUpperCase() || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updating profile with data:", userData);
  };

  return (
    <div className="bg-gray-800 flex flex-col gap-5 rounded-xl min-h-screen py-6 px-3 sm:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-2">
            Personal Information
          </h2>
          <p className="text-sm text-neutral-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center mb-6">
            {userData.fullName ? (
              <div className="flex w-20 h-20 text-[35px] items-center mr-4 justify-center rounded-full bg-gray-500 text-white font-bold">
                {userInitial}
              </div>
            ) : (
              <Image
                src="/svgs/user-profile.png"
                alt="Profile Avatar"
                className="w-20 h-20 rounded-full mr-4"
                width={30}
                height={30}
              />
            )}
            <div className="flex flex-col gap-0">
              <h6 className="m-0 p-0 text-lg font-medium text-white">
                {userData.fullName}
              </h6>
              <p className="m-0 p-0 text-sm font-medium text-white">
                {userData.role}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <InputField
                label="First Name"
                type="text"
                name="firstName" // Use name!
                placeholder="John"
                value={userData.fullName}
                onChange={handleChange}
                required={true}
              />
              <InputField
                label="Phone"
                type="number"
                name="phone" // Use name!
                placeholder="Phone"
                value={userData.phone}
                onChange={handleChange}
                required={true}
              />
            </div>

            {/* Role Field */}
            <InputField
              label="Role"
              type="text"
              name="role" // Use name!
              placeholder="Tenant"
              value={userData.role}
              onChange={handleChange}
              required={true}
              disabled={true}
            />

            {/* Email Field */}
            <InputField
              label="Email Address"
              type="email"
              name="email" // Use name!
              placeholder="john.doe@example.com"
              value={userData.email}
              onChange={handleChange}
              required={true}
              disabled={true}
            />
          </div>

          <div className="flex justify-end mt-5">
            <Button
              className="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
