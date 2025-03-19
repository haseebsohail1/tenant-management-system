import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GetAdminPropertiesList } from "../ApiComponent";
import toast from "react-hot-toast";

interface Property {
  name: string;
  owner: string;
  manager: string;
  city: string;
  state: string;
  country: string;
  unitCount: number;
}

type FilterType = "all" | "state" | "country" | "city";

const PropertiesTable: React.FC = () => {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);

      if (!session?.user) {
        toast.error("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        const token = session?.token;
        if (!token) {
          toast.error("Token not found in session");
          setLoading(false);
          return;
        }

        let state = "";
        let country = "";
        let city = "";

        if (filterType === "state") state = filterValue;
        if (filterType === "country") country = filterValue;
        if (filterType === "city") city = filterValue;

        const response = await GetAdminPropertiesList(
          token,
          state,
          country,
          city
        );
        setProperties(response.data.result.data);
        setLoading(false);
      } catch (err: any) {
        toast.error("Failed to fetch properties");
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session, filterType, filterValue]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilterType = e.target.value as FilterType;
    setFilterType(newFilterType);
    setShowInput(newFilterType !== "all");
    setFilterValue("");
  };

  const getFilterPlaceholder = () => {
    switch (filterType) {
      case "state":
        return "Enter State";
      case "country":
        return "Enter Country";
      case "city":
        return "Enter City";
      default:
        return "";
    }
  };

  const headers = [
    "Name",
    "Owner",
    "Manager",
    "City",
    "State",
    "Country",
    "UnitCount",
  ];
  const propertyKeys: (keyof Property)[] = [
    "name",
    "owner",
    "manager",
    "city",
    "state",
    "country",
    "unitCount",
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-md text-white mt-4">
      <div className="p-6 flex justify-end items-center">
        <div className="space-x-2">
          <label htmlFor="filterType">Filter By:</label>
          <select
            id="filterType"
            onChange={handleFilterTypeChange}
            value={filterType}
            className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:none"
          >
            <option value="all">All Filters</option>
            <option value="state">State</option>
            <option value="country">Country</option>
            <option value="city">City</option>
          </select>

          {showInput && (
            <>
              <label htmlFor="filterValue">
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}:
              </label>
              <input
                type="text"
                id="filterValue"
                name="filterValue"
                value={filterValue}
                onChange={handleFilterChange}
                placeholder={getFilterPlaceholder()}
                className="py-2 px-3 w rounded-md bg-gray-700 text-white focus:outline-none focus:none"
              />
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {loading && <div className="p-4">Loading properties...</div>}
          {!loading && (
            <tbody className="divide-y text-gray-400 text-xs divide-gray-700">
              {properties.map((property, index) => (
                <tr key={index}>
                  {propertyKeys.map((key, keyIndex) => (
                    <td key={keyIndex} className="px-6 py-4 whitespace-nowrap">
                      {property[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default PropertiesTable;
