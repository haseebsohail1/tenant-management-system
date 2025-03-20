// components/UserTable.tsx

import React from "react";
import Button from "../Button/Button";
import Image from "next/image";

interface UserTableProps {
  users: any[];
  columnOrder: string[];
  columnTitles: { [key: string]: string };
  loading?: boolean;
  onEdit?: (user: any) => void;
  onDelete?: (user: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  columnOrder,
  columnTitles,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900">
          <tr>
            {columnOrder.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-6 py-5 whitespace-nowrap text-left text-mediumn font-medium text-neutral-300  tracking-wider"
              >
                {columnTitles[col] || col}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-5 text-right text-mediumn font-medium text-neutral-300 tracking-wider"
            >
              <span className="text-white">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {loading ? (
            <tr>
              <td
                colSpan={columnOrder.length + 1}
                className="p-4 text-white text-left"
              >
                Loading...
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                {columnOrder.map((col) => (
                  <td
                    key={`${user._id}-${col}`}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                  >
                    {user[col]}
                  </td>
                ))}
                <td className="px-6 py-4 flex justify-end flex-row gap-2 text-right text-sm font-medium">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(user)}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      <Image
                        src="/svgs/edit.svg"
                        alt="Logo"
                        height={20}
                        width={20}
                      />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(user._id)}
                      className="text-red-600 hover:text-red-500"
                    >
                      <Image
                        src="/svgs/delete.svg"
                        alt="Logo"
                        height={18}
                        width={18}
                      />
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
