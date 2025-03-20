// components/TableSearchAndFilter.tsx

import React, { useState, ChangeEvent } from "react";
interface TableSearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  roleFilter: string;
  setRoleFilter: (roleFilter: string) => void;
  roles: string[];
  FilterTitle: string;
  SearchTitle: string;
}

const TableSearchAndFilter: React.FC<TableSearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  roles,
  FilterTitle,
  SearchTitle,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-800 flex items-center justify-between space-x-4">
      <div className="flex flex-row gap-3 items-center">
        <span className="text-mediumn text-white">
          Filter By {FilterTitle}:
        </span>
        <select
          className="px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:none"
          value={roleFilter}
          onChange={handleRoleFilterChange}
        >
          <option value="">All {FilterTitle}</option>
          {roles
            .filter((role) => role !== "")
            .map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
        </select>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder={`Search by ${SearchTitle}`}
          className="py-2 pr-5 w-full pl-9 rounded-md bg-gray-700 text-white focus:outline-none focus:none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default TableSearchAndFilter;
