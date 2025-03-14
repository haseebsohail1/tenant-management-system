import React, { useState, ChangeEvent, useMemo } from "react";

interface TableSearchAndFilterProps {
  users: any[];
  columnTitles: { [key: string]: string };
  onFilterChange: (filterColumn: string, filterValue: string) => void;
  filterColumnOrder: string[];
  selectedFilterColumn: string;
  selectedFilterValue: string;
}

const TableSearchAndFilter: React.FC<TableSearchAndFilterProps> = ({
  users,
  columnTitles,
  onFilterChange,
  filterColumnOrder,
  selectedFilterColumn,
  selectedFilterValue,
}) => {
  const [filterColumn, setFilterColumn] = useState<string>(
    selectedFilterColumn || ""
  );
  const [filterValue, setFilterValue] = useState<string>(
    selectedFilterValue || ""
  );

  const handleColumnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFilterColumn = e.target.value;
    setFilterColumn(newFilterColumn);
    setFilterValue(""); // Clear filter value when column changes
    onFilterChange(newFilterColumn, "");
  };

  const handleFilterValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFilterValue = e.target.value;
    setFilterValue(newFilterValue);
    onFilterChange(filterColumn, newFilterValue);
  };

  const filterColumnOptions = useMemo(() => {
    console.log("filterColumnOptions is running"); // [TROUBLESHOOTING LOG 3]
    if (!filterColumn) {
      console.log("No filterColumn selected"); // [TROUBLESHOOTING LOG 4]
      return [];
    }

    const uniqueValues = new Set<string>();

    if (filterColumn === "role") {
      console.log("Filtering by role"); // [TROUBLESHOOTING LOG 5]
      users.forEach((user) => {
        if (user.role) {
          uniqueValues.add(String(user.role).toLowerCase());
          console.log("Adding role:", user.role); // [TROUBLESHOOTING LOG 6]
        } else {
          console.log("User has no role:", user); // [TROUBLESHOOTING LOG 7]
        }
      });
    } else {
      console.log("Filtering by other column:", filterColumn); // [TROUBLESHOOTING LOG 8]
      users.forEach((user) => {
        const value = user[filterColumn];
        if (value !== undefined && value !== null) {
          uniqueValues.add(String(value).toLowerCase());
        }
      });
    }

    const options = Array.from(uniqueValues).sort();
    console.log("Filter Column Options:", options); // [TROUBLESHOOTING LOG 9]
    return options;
  }, [users, filterColumn]);

  return (
    <div className="p-4 bg-gray-800 flex items-center justify-between space-x-4">
      <div className="flex items-center gap-2">
        <label htmlFor="filterColumn" className="text-white">
          Filter By:
        </label>
        <select
          id="filterColumn"
          className="bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:none"
          value={filterColumn}
          onChange={handleColumnChange}
        >
          <option value="">Select Column</option>
          {filterColumnOrder.map((col) => (
            <option key={col} value={col}>
              {columnTitles[col] || col}
            </option>
          ))}
        </select>

        {filterColumn && ( // Conditionally render the value select
          <>
            <label htmlFor="filterValue" className="text-white ml-2">
              Select Value:
            </label>
            <select
              id="filterValue"
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
          </>
        )}
      </div>
    </div>
  );
};

export default TableSearchAndFilter;
