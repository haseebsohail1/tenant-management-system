import React, { useState } from "react";
import TableList from "@/components/TableList";
import ModalComponent from "@/components/ModalComponent";

interface User {
  [key: string]: string;
}

const PropertyList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      role: "tenant",
      email: "john.doe@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "tenant",
      email: "jane.smith@example.com",
    },
    {
      id: "3",
      name: "Jane Smith",
      role: "tenant",
      email: "jane.smith@example.com",
    },
    {
      id: "4",
      name: "Jane Smith",
      role: "tenant",
      email: "jane.smith@example.com",
    },
    {
      id: "5",
      name: "Jane Smith",
      role: "tenant",
      email: "jane.smith@example.com",
    },
  ]);

  const columnOrder = ["id", "name", "role", "email"];
  const columnTitles = {
    id: "ID",
    name: "Name",
    role: "Role",
    email: "Email",
  };

  const inputLabels = {
    name: "Full Name",
    title: "Job Title",
    email: "Email Address",
    role: "User Role",
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSave = (newUser: any) => {
    setUsers([...users, newUser]);
    handleAddClose();
  };

  const handleEditUser = (user: User) => {
    console.log("Editing user:", user);
  };

  const handleDeleteUser = (user: User) => {
    console.log("Deleting user:", user);
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <div>
      <TableList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        columnOrder={columnOrder}
        columnTitles={columnTitles}
      />
      <ModalComponent
        isOpen={isAddModalOpen}
        onClose={handleAddClose}
        onSave={handleAddSave}
        headingText="Add Properites"
        inputLabels={inputLabels}
      />
    </div>
  );
};

export default PropertyList;
