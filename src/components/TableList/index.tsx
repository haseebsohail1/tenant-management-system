import React, { useState, ChangeEvent, useMemo } from "react";
import Button from "../Button/Button";
import Image from "next/image";

interface User {
  [key: string]: string;
}

interface UsersTableProps {
  users: User[];
  onAdd?: () => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onAddTitle?: string;
  title: string;
  description: string;
  columnOrder: string[];
  columnTitles: { [key: string]: string };
  itemsPerPage: number;
}

const TableList: React.FC<UsersTableProps & { loading?: boolean }> = ({
  users,
  onEdit,
  onDelete,
  onAdd,
  onAddTitle,
  title,
  description,
  columnOrder,
  columnTitles,
  itemsPerPage,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter((user) => {
        return columnOrder.some((key) =>
          user[key]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (filterColumn && filterValue) {
      result = result.filter((user) => {
        if (filterColumn) {
          return (
            user[filterColumn]?.toLowerCase() === filterValue.toLowerCase()
          );
        }
        return true;
      });
    }

    return result;
  }, [users, searchTerm, filterColumn, filterValue, columnOrder]);

  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prev: any) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev: any) => Math.min(prev + 1, totalPages));
  };

  const showPagination = filteredUsers.length > itemsPerPage;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    if (!e.target.value) {
      setCurrentPage(1);
    }
  };

  const handleFilterColumnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterColumn(e.target.value);
    setFilterValue("");
    setCurrentPage(1);
  };

  const handleFilterValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  const allowedColumnOrder = [columnOrder[1], columnOrder[2]];

  const filterColumnOptions = useMemo(() => {
    if (!filterColumn) return [];
    const uniqueValues = new Set<string>();
    users.forEach((user) => {
      const value = user[filterColumn];
      if (value) {
        uniqueValues.add(value.toLowerCase());
      }
    });
    return Array.from(uniqueValues).sort();
  }, [filterColumn, users]);

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-white">{description}</p>
        </div>
        <div>
          {onAdd && onAddTitle && (
            <Button
              onClick={onAdd}
              className="bg-indigo-800 text-white py-2 px-8 rounded-md"
            >
              {onAddTitle}
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filter Inputs */}
      <div className="p-4 bg-gray-800 flex items-center justify-between space-x-4">
        <div className="flex items-center gap-2">
          <select
            className="bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none  focus:none"
            value={filterColumn}
            onChange={handleFilterColumnChange}
          >
            <option value="">Select Filter Column</option>
            {allowedColumnOrder.map((key) => (
              <option key={key} value={key}>
                {columnTitles[key] || key}
              </option>
            ))}
          </select>

          {filterColumn && (
            <select
              className="bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:none"
              value={filterValue}
              onChange={handleFilterValueChange}
            >
              <option value="">Select Value</option>
              {filterColumnOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          )}
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white rounded-md py-2 px-3 w-1/3 focus:outline-none focus:none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              {columnOrder.map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-5 text-left text-mediumn font-medium text-neutral-300 uppercase tracking-wider"
                >
                  {columnTitles[key] || key}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-5 text-right text-mediumn font-medium text-neutral-300 uppercase tracking-wider"
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
              currentUsers.map((user) => (
                <tr key={user[columnOrder[0]] || Math.random()}>
                  {columnOrder.map((key) => (
                    <td
                      key={key}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                    >
                      {user[key]}
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
                        onClick={() => onDelete(user)}
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

      {/* Pagination Footer */}
      {showPagination && (
        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
          <div className="text-sm text-white">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
            results
          </div>
          <div className="flex items-center">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed mr-2"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <Button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableList;
