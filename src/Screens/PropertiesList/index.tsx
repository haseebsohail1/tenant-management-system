import React, { useEffect, useState } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import DetailsModalComponent from "@/components/DetailsModalComponent";
import {
  GetPropertiesList,
  deletePropertyData,
  AddProperty,
  GetUserList,
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
  const {
    users,
    properties,
    filteredProperties,
    loading,
    searchTerm,
    ownerFilter,
  } = useAppSelector((state: RootState) => state.admin);

  const [availableOwnerNames, setAvailableOwnerNames] = useState<string[]>([]);
  const [availablePropertiesList, setAvailablePropertiesList] = useState(false);
  const [managersList, setManagersList] = useState<
    { id: string; name: string }[]
  >([]);

  const columnOrder = [
    "name",
    "landlordId",
    "managerId",
    "address",
    "createdAt",
  ];
  const columnTitles = {
    name: "Name",
    landlordId: "Owner",
    managerId: "Manager",
    address: "Address",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (session?.token) {
          const response = await GetUserList("Manager", session?.token);
          if (response?.data?.result?.data) {
            const managers = response.data.result.data.map((user: any) => ({
              id: user._id,
              name: user.name,
            }));
            setManagersList(managers);
          }
        }
      } finally {
      }
    };
    fetchUsers();
  }, [session]);

  useEffect(() => {
    const fetchProperties = async () => {
      dispatch(setLoading(true));
      try {
        if (session?.token) {
          const LandloardId = session?.user?.id;
          let response;
          if (session?.user?.role == "Landlord") {
            response = await GetPropertiesList(LandloardId, session?.token);
          } else {
            response = await GetPropertiesList("", session?.token);
          }
          if (response?.data?.result?.data?.length > 0) {
            const mappedProperties = response.data.result.data.map(
              (property: any) => {
                return {
                  ...property,
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
    const uniqueMangersSet: Set<string> = new Set(
      properties.map((property: any) => property.name)
    );
    const uniqueManagersArray = Array.from(uniqueMangersSet);
    setAvailableOwnerNames(uniqueManagersArray);
  }, [properties]);

  useEffect(() => {
    let filtered = [...properties];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((property) =>
        property.address.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (ownerFilter) {
      filtered = filtered.filter((property) => property.name === ownerFilter);
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
    if (session?.user?.role !== "Landlord") {
      toast.error("Only Landlords can add properties.");
      return;
    }
    setIsAddModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLandlord, setSelectedLandlord] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

  const handleLanlordClick = (landlord: any) => {
    setSelectedLandlord(landlord);
    setIsModalOpen(true);
  };

  const handleManagerClick = (unit: any) => {
    setSelectedManager(unit);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLandlord(null);
    setSelectedManager(null);
  };

  const inputLabels: Record<string, { label: string; type: "text" }> = {
    name: { label: "Full Name", type: "text" },
    address: { label: "Address", type: "text" },
    city: { label: "City", type: "text" },
    country: { label: "Country", type: "text" },
    state: { label: "State", type: "text" },
    zipcode: { label: "Zip Code", type: "text" },
  };

  const selectLabels = {
    managerId: {
      label: "Manager",
      options: managersList.map((manager) => ({
        label: manager.name,
        value: manager.id,
      })),
    },
  };

  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSave = async (property: any) => {
    if (!session?.token) {
      toast.error("Unauthorized: No session token found");
      return;
    }
    if (
      !property.name ||
      !property.address ||
      !property.city ||
      !property.country ||
      !property.state ||
      !property.zipcode ||
      !property.managerId
    ) {
      toast.error("All fields are required!");
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await AddProperty(session.token, property);
      if (response?.data?.result) {
        const newProperty = response.data.result;
        dispatch(setProperties([...properties, newProperty]));
        dispatch(setFilteredProperties([...filteredProperties, newProperty]));
        toast.success("Property added successfully");
      }
    } catch (error) {
      toast.error("Failed to add user");
    } finally {
      dispatch(setLoading(false));
      handleAddClose();
    }
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
            selectLabels={selectLabels}
            loading={loading}
          />
        </>
      ) : (
        <TableHeader
          title="All Properties List"
          description="A list of registered Properties."
        />
      )}
      <DetailsModalComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        landlord={selectedLandlord}
        manager={selectedManager}
      />
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
            FilterTitle="Name"
            SearchTitle="address"
          />
          <TableList
            users={
              loading
                ? []
                : filteredProperties.map((property) => ({
                    ...property,
                    landlordId: (
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleLanlordClick(property.landlordId)}
                      >
                        {property.landlordId ? "Owner Detail" : ""}
                      </span>
                    ),
                    managerId: (
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleManagerClick(property.managerId)}
                      >
                        {property.managerId ? "Manger Detail" : ""}
                      </span>
                    ),
                  }))
            }
            columnOrder={columnOrder}
            columnTitles={columnTitles}
            loading={loading}
            onDelete={
              session?.user?.role === "Landlord"
                ? handleDeleteProperty
                : undefined
            }
          />
        </>
      )}
    </div>
  );
};

export default AdminPropertiesList;
