import React, { useEffect, useState } from "react";
import TableHeader from "@/components/TableHeader";
import { useSession } from "next-auth/react";
import {
  GetUserList,
  deleteUserData,
  AddUsers,
  updateUsers,
} from "@/components/ApiComponent";
import UserTable from "@/components/TableList";
import TableSearchAndFilter from "@/components/SearchFilters";
import Pagination from "@/components/Pagination";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ModalComponent from "@/components/ModalComponent";
import EditModalComponent from "@/components/EditModalComponent";
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
          if (response?.data?.result?.data) {
            dispatch(setUsers(response.data.result.data));
          }
        }
      } catch {
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

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are You Sure",
      text: "Won't be able to revert",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "rgb(31 41 55)",
      color: "white",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        if (session?.token) {
          await deleteUserData(session.token, userId);
          dispatch(setUsers(users.filter((user) => user._id !== userId)));
          toast.success("User deleted successfully");
        }
      } catch {
        toast.error("Failed to delete user");
      }
    }
  };

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddClick = () => setIsAddModalOpen(true);
  const handleAddClose = () => setIsAddModalOpen(false);

  const inputLabels: Record<
    string,
    { label: string; type: "text" | "email" | "tel" }
  > = {
    name: { label: "Full Name", type: "text" },
    email: { label: "Email", type: "email" },
    phone: { label: "Phone", type: "tel" },
  };

  const selectLabels = {
    role: {
      label: "Role",
      options: [
        { label: "Manager", value: "Manager" },
        { label: "Landlord", value: "Landlord" },
        { label: "Tenant", value: "Tenant" },
      ],
    },
  };

  const handleAddSave = async (newUser: any) => {
    if (!session?.token) {
      toast.error("Unauthorized: No session token found");
      return;
    }
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.role) {
      toast.error("All fields are required!");
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await AddUsers(session.token, newUser);
      if (response?.data?.result) {
        const updated = [...users, response.data.result];
        dispatch(setUsers(updated));
        dispatch(setFilteredUsers(updated));
        toast.success("User added successfully");
      }
    } catch {
      toast.error("Failed to add user");
    } finally {
      dispatch(setLoading(false));
      handleAddClose();
    }
  };

  //////////////// Edit Modal State /////////////////////////////

  // State for managing edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditSave = async (updatedData: any) => {
    if (!session?.token || !selectedUser?._id) {
      toast.error("Unauthorized or no user selected");
      return;
    }

    const data = {
      name: updatedData.name ?? selectedUser.name,
    };

    dispatch(setLoading(true));
    try {
      const response = await updateUsers(session.token, selectedUser._id, data);
      if (response?.data?.result) {
        const updatedUsers = users.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedData } : user
        );
        dispatch(setUsers(updatedUsers));
        dispatch(setFilteredUsers(updatedUsers));
        toast.success("User updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      dispatch(setLoading(false));
      handleEditClose();
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <TableHeader
        title="All Users List"
        description="A list of registered users."
        onAdd={handleAddClick}
        onAddTitle="Add User"
      />

      <ModalComponent
        isOpen={isAddModalOpen}
        onClose={handleAddClose}
        onSave={handleAddSave}
        headingText="Add User"
        inputLabels={inputLabels}
        selectLabels={selectLabels}
        loading={loading}
      />

      <EditModalComponent
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onUpdate={handleEditSave}
        headingText="Edit User"
        inputLabels={{
          name: { label: "Full Name", type: "text" },
        }}
        loading={loading}
        selectLabels={{}}
        initialData={{ name: selectedUser?.name }}
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
        users={loading ? [] : filteredUsers}
        columnOrder={columnOrder}
        columnTitles={columnTitles}
        loading={loading}
        onDelete={handleDeleteUser}
        onEdit={handleEditClick}
      />
    </div>
  );
};

export default AdminUsersList;
