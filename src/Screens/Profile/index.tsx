import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../components/Button/Button";
import InputField from "@/components/InputField";
import { useSession, getSession } from "next-auth/react";
import { updateUsers } from "@/components/ApiComponent";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setUsers,
  setFilteredUsers,
  setLoading,
  setCurrentUser,
} from "@/redux/adminSlice";

interface ProfileProps {}

interface UserData {
  fullName: string;
  phone: string;
  role: string;
  email: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const { users, loading, currentUser } = useAppSelector(
    (state: RootState) => state.admin
  );

  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    phone: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        fullName: currentUser.name || "",
        phone: currentUser.phone || "",
        role: session?.user?.role || "",
        email: session?.user?.email || "",
      });
    } else if (session?.user) {
      setUserData({
        fullName: session.user.name || "",
        phone: session.user.phone || "",
        role: session.user.role || "",
        email: session.user.email || "",
      });
    }
  }, [session, currentUser]);

  const userInitial = userData?.fullName?.charAt(0).toUpperCase() || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const userId = session?.user?.id;
    const token = (session as any)?.token;

    if (!userId || !token) {
      toast.error("User ID or token missing from session");
      return;
    }

    const updatedData = {
      name: userData.fullName,
      phone: userData.phone,
    };

    dispatch(setLoading(true));
    try {
      const res = await updateUsers(token, userId, updatedData);

      if (res?.data?.result) {
        const updatedUsers = users.map((user) =>
          String(user._id) === String(userId)
            ? { ...user, name: updatedData.name, phone: updatedData.phone }
            : user
        );
        dispatch(setUsers(updatedUsers));
        dispatch(setFilteredUsers(updatedUsers));

        dispatch(
          setCurrentUser({
            ...currentUser,
            ...updatedData,
          })
        );
        toast.success("Profile updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("An error occurred while updating");
    } finally {
      dispatch(setLoading(false));
    }
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
            <div className="flex w-20 h-20 text-[35px] items-center mr-4 justify-center rounded-full bg-gray-500 text-white font-bold">
              {userInitial}
            </div>
            <div className="flex flex-col gap-0">
              <h6 className="text-lg font-medium text-white">
                {userData.fullName}
              </h6>
              <p className="text-sm font-medium text-white">{userData.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <InputField
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="John"
                value={userData.fullName}
                onChange={handleChange}
                required
              />
              <InputField
                label="Phone"
                type="number"
                name="phone"
                placeholder="Phone"
                value={userData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <InputField
              label="Role"
              type="text"
              name="role"
              placeholder="Tenant"
              value={userData.role}
              onChange={handleChange}
              required
              disabled
            />

            <InputField
              label="Email Address"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={userData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="flex justify-end mt-5">
            <Button
              className="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {loading ? "Updating....." : "Update Profile"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
