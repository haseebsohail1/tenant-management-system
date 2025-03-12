import React, { useState, useEffect } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import { GetUserList } from "@/components/ApiComponent";

interface User {
  [key: string]: any;
}

const AdminUsersList: React.FC = () => {
  const { data: session } = useSession();
  const [landlordUsers, setLandlordUsers] = useState<User[]>([]);
  const [tenantUsers, setTenantUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columnOrder = ["name", "email", "role", "createdAt"];
  const columnTitles = {
    name: "Name",
    email: "Email",
    role: "Role",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchUsers = async (role: string) => {
      try {
        if (session?.token) {
          const response = await GetUserList(role, session?.token);

          if (response?.data?.result?.data) {
            return response.data.result.data;
          } else {
            return [];
          }
        } else {
          return [];
        }
      } catch (err: any) {
        console.error(`Failed to fetch ${role} users:`, err);
        return [];
      }
    };

    const loadUsers = async () => {
      setLoading(true);
      try {
        const landlordData = await fetchUsers("Landlord");
        setLandlordUsers(landlordData);

        const tenantData = await fetchUsers("Tenant");
        setTenantUsers(tenantData);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [session]);

  const allUsers = [...landlordUsers, ...tenantUsers];

  return (
    <TableList
      users={loading ? [] : allUsers}
      title="All Users List"
      description="A list of registered users."
      columnOrder={columnOrder}
      columnTitles={columnTitles}
      itemsPerPage={10}
      loading={loading}
    />
  );
};

export default AdminUsersList;
