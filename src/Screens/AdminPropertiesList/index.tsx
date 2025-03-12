import React, { useState, useEffect } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import { GetPropertiesList } from "@/components/ApiComponent";

interface Property {
  [key: string]: any;
}

const AdminPropertiesList: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<Property[]>([]);

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

          console.log("propperties", response);

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
        }
      } catch (err: any) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session]);

  return (
    <TableList
      users={loading ? [] : properties}
      title="All Properties List"
      description="A list of Properties"
      columnOrder={columnOrder}
      columnTitles={columnTitles}
      itemsPerPage={10}
      loading={loading}
    />
  );
};

export default AdminPropertiesList;
