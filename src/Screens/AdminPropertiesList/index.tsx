import React, { useState, useEffect } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import { GetPropertiesList } from "@/components/ApiComponent";
import TableHeader from "@/components/TableHeader";
import Pagination from "@/components/Pagination";

interface Property {
  _id: any;
  name: any;
  owner: any;
  manager: any;
  address: any;
  createdAt: any;
}

interface PaginationData {
  currentPage: number;
  from: number;
  to: number;
  total: number;
  pageSize: number; // Added pageSize to PaginationData
}

const AdminPropertiesList: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData | null>(
    null
  );

  const columnOrder = ["name", "owner", "manager", "address", "createdAt"];
  const columnTitles = {
    name: "Name",
    owner: "Owner",
    manager: "Manager",
    address: "Address",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        if (session?.token) {
          const response = await GetPropertiesList(session?.token);

          console.log("properties", response);

          if (response?.data?.result?.data) {
            const mappedProperties = response.data.result.data.map(
              (property: any) => {
                return {
                  ...property,
                  owner: property.landlordId?.name || "Unknown Owner",
                  manager: property.managerId?.name || "Unknown manager",
                };
              }
            );
            setProperties(mappedProperties);
          }

          if (response?.data?.result?.pagination) {
            const pagination = response?.data?.result?.pagination;
            setPaginationData({
              currentPage: pagination.currentPage,
              from: pagination.from,
              to: pagination.to,
              total: pagination.total,
              pageSize: pagination.pageSize,
            });
          } else {
            setPaginationData(null);
          }
        }
      } catch (err: any) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session]);

  const handlePageChange = (pageNumber: number) => {};

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <TableHeader
        title="All Properties List"
        description="A list of registered Properties."
      />
      <TableList
        users={loading ? [] : properties}
        columnOrder={columnOrder}
        columnTitles={columnTitles}
        loading={loading}
      />
      {paginationData && properties.length > 1 && (
        <Pagination
          currentPage={paginationData.currentPage}
          totalItems={paginationData.total}
          totalPages={2}
          itemsPerPage={1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AdminPropertiesList;
