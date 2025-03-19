import React, { useEffect, useState } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import { GetPropertiesList } from "@/components/ApiComponent";
import TableHeader from "@/components/TableHeader";
import TableSearchAndFilter from "@/components/SearchFilters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  setProperties,
  setFilteredProperties,
  setLoading,
  setSearchTerm,
  setOwnerFilter,
} from "@/redux/adminSlice";

const AdminPropertiesList: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { properties, filteredProperties, loading, searchTerm, ownerFilter } =
    useAppSelector((state: RootState) => state.admin);

  const [availableOwnerNames, setAvailableOwnerNames] = useState<string[]>([]);

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
      dispatch(setLoading(true));
      try {
        if (session?.token) {
          const role = session?.user?.role;
          const LandloardId = session?.user?.id;
          console.log(LandloardId);
          let response;

          if (session?.user?.role == "Landlord") {
            response = await GetPropertiesList(LandloardId, session?.token);
          } else {
            response = await GetPropertiesList("", session?.token);
          }
          if (response?.data?.result?.data) {
            const mappedProperties = response.data.result.data.map(
              (property: any) => {
                return {
                  ...property,
                  owner: property.landlordId?.name || "",
                  manager: property.managerId?.name || "",
                  landlordId: property.landlordId,
                  managerId: property.managerId,
                };
              }
            );
            dispatch(setProperties(mappedProperties));
          }
        }
      } catch (err: any) {
        dispatch(setProperties([]));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProperties();
  }, [session, dispatch]);

  useEffect(() => {
    const uniqueOwnersSet: Set<string> = new Set(
      properties.map((property: any) => property.owner)
    );
    const uniqueOwnersArray = Array.from(uniqueOwnersSet);
    setAvailableOwnerNames(uniqueOwnersArray);
  }, [properties]);

  useEffect(() => {
    let filtered = [...properties];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(lowerSearchTerm) ||
          property.address.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (ownerFilter) {
      filtered = filtered.filter((property) => property.owner === ownerFilter);
    }

    dispatch(setFilteredProperties(filtered));
  }, [properties, searchTerm, ownerFilter, dispatch]);

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <TableHeader
        title="All Properties List"
        description="A list of registered Properties."
      />
      <TableSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={(term) => dispatch(setSearchTerm(term))}
        roleFilter={ownerFilter}
        setRoleFilter={(filter) => dispatch(setOwnerFilter(filter))}
        roles={availableOwnerNames}
        FilterTitle="Owner"
        SearchTitle="name and address"
      />
      <TableList
        users={loading ? [] : filteredProperties}
        columnOrder={columnOrder}
        columnTitles={columnTitles}
        loading={loading}
      />
    </div>
  );
};

export default AdminPropertiesList;
