import React, { useEffect, useState } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import {
  GetPropertiesList,
  deletePropertyData,
} from "@/components/ApiComponent";
import TableHeader from "@/components/TableHeader";
import TableSearchAndFilter from "@/components/SearchFilters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ModalComponent from "@/components/ModalComponent";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
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
  const [availablePropertiesList, setAvailablePropertiesList] = useState(false);

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
          const LandloardId = session?.user?.id;
          console.log(LandloardId);
          let response;

          if (session?.user?.role == "Landlord") {
            response = await GetPropertiesList(LandloardId, session?.token);
          } else {
            response = await GetPropertiesList("", session?.token);
          }

          console.log(response);
          if (response?.data?.result?.data?.length > 0) {
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
            setAvailablePropertiesList(false);
          } else {
            dispatch(setProperties([]));
            setAvailablePropertiesList(true);
          }
        }
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

  const handleDeleteProperty = async (propertyId: any) => {
    const result = await Swal.fire({
      title: "Are You Sure",
      text: "Wont be able to Revert",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "rgb(31 41 55)",
      color: "white",
      confirmButtonText: "Yes Delete it",
      cancelButtonText: "No Cancel",
    });

    if (result.isConfirmed) {
      try {
        if (session && session.token) {
          await deletePropertyData(session.token, propertyId);
          dispatch(
            setProperties(
              properties.filter((property) => property._id !== propertyId)
            )
          );
          toast.success("Property Deleted Successfully");
        }
      } catch (error) {
        toast.error("Failed to Delete Property");
      }
    }
  };

  //Model Component

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

  const inputLabels = {
    name: "Full Name",
    address: "Address",
    city: "City",
    country: "Country",
    state: "State",
    zipcode: "zipcode",
  };

  const handleAddSave = (newUser: any) => {
    handleAddClose();
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      {session?.user?.role == "Landlord" ? (
        <>
          <TableHeader
            title="All Properties List"
            description="A list of registered Properties."
            onAdd={handleAddClick}
            onAddTitle="Add Property"
          />
          <ModalComponent
            isOpen={isAddModalOpen}
            onClose={handleAddClose}
            onSave={handleAddSave}
            headingText="Add Properites"
            inputLabels={inputLabels}
          />
        </>
      ) : (
        <TableHeader
          title="All Properties List"
          description="A list of registered Properties."
        />
      )}
      {availablePropertiesList ? (
        <div className="p-5 text-gray-400">
          Properties List is not available
        </div>
      ) : (
        <>
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
            onDelete={handleDeleteProperty}
          />
        </>
      )}
    </div>
  );
};

export default AdminPropertiesList;
