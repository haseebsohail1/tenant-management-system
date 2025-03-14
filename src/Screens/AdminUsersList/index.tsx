// components/AdminUsersList.tsx

import React, { useState, useEffect } from "react";
import TableHeader from "@/components/TableHeader";
import { useSession } from "next-auth/react";
import { GetUserList } from "@/components/ApiComponent";
import UserTable from "@/components/TableList";

interface User {
  _id: any;
  name: string;
  email: any;
  role: any;
  createdAt: any;
}

const AdminUsersList: React.FC = () => {
  const { data: session } = useSession();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columnOrder = ["name", "email", "role", "createdAt"];
  const columnTitles = {
    name: "Name",
    email: "Email",
    role: "Role",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (session?.token) {
          const roles = ["Landlord", "Tenant", "Manager"];
          const allUserData: User[] = [];

          for (const role of roles) {
            const response = await GetUserList(role, session?.token);
            console.log(response);
            if (response?.data?.result?.data) {
              allUserData.push(...response.data.result.data);
            } else {
              console.warn(`No ${role} users found.`);
            }
          }

          setAllUsers(allUserData);
        } else {
          console.warn("No session token available.");
          setAllUsers([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch users:", err);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session]);

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <TableHeader
        title="All Users List"
        description="A list of registered users."
      />
      <UserTable
        users={allUsers}
        columnOrder={columnOrder}
        columnTitles={columnTitles}
        loading={loading}
      />
    </div>
  );
};

export default AdminUsersList;
