import React, { useEffect, useState } from "react";
import TableHeader from "@/components/TableHeader";
import { useSession } from "next-auth/react";
import { GetUserList, deleteUserData } from "@/components/ApiComponent";
import UserTable from "@/components/TableList";
import TableSearchAndFilter from "@/components/SearchFilters";
import Pagination from "@/components/Pagination";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  setUsers,
  setFilteredUsers,
  setLoading,
  setSearchTerm,
  setRoleFilter,
} from "@/redux/adminSlice";

const AdminUsersList: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { users, filteredUsers, loading, searchTerm, roleFilter } =
    useAppSelector((state: RootState) => state.admin);

  const columnOrder = ["name", "email", "role", "createdAt"];
  const columnTitles = {
    name: "Name",
    email: "Email",
    role: "Role",
    createdAt: "Created At",
  };

  const roles = ["", "Landlord", "Tenant", "Manager"];

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading(true));
      try {
        if (session?.token) {
          const response = await GetUserList("", session?.token);
          console.log(response);
          if (response?.data?.result?.data) {
            dispatch(setUsers(response.data.result.data));
          }
          if (response?.data?.result?.pagination) {
            console.log(response?.data?.result?.pagination);
          }
        }
      } catch (err: any) {
        dispatch(setUsers([]));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUsers();
  }, [session, dispatch]);

  useEffect(() => {
    let filtered = [...users];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerSearchTerm) ||
          user.email.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    dispatch(setFilteredUsers(filtered));
  }, [users, searchTerm, roleFilter, dispatch]);

  const handleDeleteUser = async (userId: any) => {
    const result = await Swal.fire({
      title: "Are You Sure",
      text: "Wont be able to Revert",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "rgb(31 41 55)",
      color: "white",
      confirmButtonText: "Yes Delete it",
      cancelButtonText: "No Cancel",
    });

    if (result.isConfirmed) {
      try {
        if (session && session.token) {
          await deleteUserData(session.token, userId);
          dispatch(setUsers(users.filter((user) => user._id !== userId)));
          toast.success("User Deleted Successfully");
        }
      } catch (error) {
        toast.error("Failed to Delete User");
      }
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <TableHeader
        title="All Users List"
        description="A list of registered users."
      />

      <TableSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={(term) => dispatch(setSearchTerm(term))}
        roleFilter={roleFilter}
        setRoleFilter={(filter) => dispatch(setRoleFilter(filter))}
        roles={roles}
        FilterTitle="Roles"
        SearchTitle="name and email"
      />

      <UserTable
        users={filteredUsers}
        columnOrder={columnOrder}
        columnTitles={columnTitles}
        loading={loading}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default AdminUsersList;
