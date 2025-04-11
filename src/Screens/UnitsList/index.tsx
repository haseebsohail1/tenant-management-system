import React, { useEffect, useState } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import {
  GetUnitsList,
  deleteUnitData,
  AddUnits,
  updateUnits,
} from "@/components/ApiComponent";
import TableHeader from "@/components/TableHeader";
import TableSearchAndFilter from "@/components/SearchFilters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ModalComponent from "@/components/ModalComponent";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { format } from "date-fns";
import EditModalComponent from "@/components/EditModalComponent";
import {
  setUnits,
  setFilteredUnits,
  setLoading,
  setSearchTerm,
  setStatusFilter,
} from "@/redux/adminSlice";

const UnitsList: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const {
    properties,
    units,
    filteredUnits,
    loading,
    searchTerm,
    statusFilter,
  } = useAppSelector((state: RootState) => state.admin);
  const [availableUnitsList, setAvailableUnitsList] = useState(false);
  const [availableStatusNames, setAvailableStatusNames] = useState<string[]>(
    []
  );

  const columnOrder = [
    "propertyId",
    "unitNumber",
    "size",
    "status",
    "unitType",
    "rentAmount",
    "availableDate",
    "createdAt",
  ];
  const columnTitles = {
    propertyId: "Property Name",
    unitNumber: "Unit Number",
    size: "Size",
    status: "Status",
    unitType: "Unit Type",
    rentAmount: "Rent Amount",
    availableDate: "Available Date",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchUnits = async () => {
      dispatch(setLoading(true));
      try {
        if (session?.token) {
          const response = await GetUnitsList(session.token);

          if (response?.data?.result?.length > 0) {
            const filteredUnits = response.data.result
              .filter((unit: any) =>
                properties.some((property) => unit.propertyId === property._id)
              )
              .map((unit: any) => {
                const property = properties.find(
                  (property) => property._id === unit.propertyId
                );
                return {
                  ...unit,
                  propertyId: property ? property.name : "",
                  availableDate: format(
                    new Date(unit.availableDate),
                    "MM-dd-yyyy"
                  ),
                };
              });

            if (filteredUnits.length > 0) {
              dispatch(setUnits(filteredUnits));
              setAvailableUnitsList(false);
            } else {
              dispatch(setUnits([]));
              setAvailableUnitsList(true);
            }
          } else {
            dispatch(setUnits([]));
            setAvailableUnitsList(true);
          }
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (properties.length > 0) {
      fetchUnits();
    } else {
      dispatch(setUnits([]));
      setAvailableUnitsList(true);
    }
  }, [session, dispatch, properties]);

  useEffect(() => {
    const uniqueOwnersSet: Set<string> = new Set(
      units.map((unit: any) => unit.status)
    );
    const uniqueStatusArray = Array.from(uniqueOwnersSet);
    setAvailableStatusNames(uniqueStatusArray);
  }, [units]);

  useEffect(() => {
    let filtered = [...units];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((unit) =>
        unit.size.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((unit) => unit.status === statusFilter);
    }

    dispatch(setFilteredUnits(filtered));
  }, [units, searchTerm, statusFilter, dispatch]);

  const handleDeleteProperty = async (unitId: any) => {
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
          await deleteUnitData(session.token, unitId);
          dispatch(setUnits(units.filter((unit) => unit._id !== unitId)));
          toast.success("Unit Deleted Successfully");
        }
      } catch (error) {
        console.error("Error deleting unit:", error);
        toast.error("Failed to Delete Unit");
      }
    }
  };

  //Model Component

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const inputLabels: Record<
    string,
    { label: string; type: "text" | "number" | "date" }
  > = {
    unitNumber: { label: "Unit Number", type: "text" },
    size: { label: "Size", type: "number" },
    rentAmount: { label: "Rent Amount", type: "number" },
    availableDate: { label: "Available Date", type: "date" },
  };

  const selectLabels = {
    unitType: {
      label: "Unit Type",
      options: [
        { label: "Apartment", value: "Apartment" },
        { label: "Office", value: "Office" },
        { label: "Shop", value: "Shop" },
        { label: "Studio", value: "Studio" },
      ],
    },
    propertyId: {
      label: "Property Name",
      options: properties.map((p) => ({
        label: p.name,
        value: p._id,
      })),
    },
  };

  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSave = async (unit: any) => {
    if (!session?.token) {
      toast.error("Unauthorized: No session token found");
      return;
    }
    if (
      !unit.unitType ||
      !unit.unitNumber ||
      !unit.size ||
      !unit.rentAmount ||
      !unit.availableDate ||
      !unit.propertyId
    ) {
      toast.error("All fields are required!");
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await AddUnits(session.token, unit);
      if (response?.data?.result) {
        dispatch(setUnits([...units, response.data.result]));
        dispatch(setFilteredUnits([...filteredUnits, response.data.result]));
        toast.success("Unit added successfully");
      }
    } catch (error) {
      error;
    } finally {
      dispatch(setLoading(false));
      handleAddClose();
    }
  };

  // State for managing edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  const handleEditClick = (user: any) => {
    setSelectedUnit(user);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setSelectedUnit(null);
  };

  const handleEditSave = async (updatedData: any) => {
    if (!session?.token || !selectedUnit?._id) {
      toast.error("Unauthorized or no user selected");
      return;
    }

    const data = {
      size: updatedData.size ?? selectedUnit.size,
    };

    dispatch(setLoading(true));
    try {
      const response = await updateUnits(session.token, selectedUnit._id, data);
      if (response?.data?.result) {
        const updatedUnits = units.map((unit) =>
          unit._id === selectedUnit._id ? { ...unit, ...updatedData } : unit
        );
        dispatch(setUnits(updatedUnits));
        dispatch(setFilteredUnits(updatedUnits));
        toast.success("Unit updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update Unit");
    } finally {
      dispatch(setLoading(false));
      handleEditClose();
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <TableHeader
        title="All Units List"
        description="A list of registered Units."
        onAdd={handleAddClick}
        onAddTitle="Add Units"
      />
      <ModalComponent
        isOpen={isAddModalOpen}
        onClose={handleAddClose}
        onSave={handleAddSave}
        headingText="Add Units"
        selectLabels={selectLabels}
        inputLabels={inputLabels}
        loading={loading}
      />

      <EditModalComponent
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onUpdate={handleEditSave}
        headingText="Edit User"
        inputLabels={{
          size: { label: "Size", type: "text" },
        }}
        loading={loading}
        selectLabels={{}}
        initialData={{
          size: selectedUnit?.size,
        }}
      />

      {availableUnitsList ? (
        <div className="p-5 text-gray-400">Units List is not available</div>
      ) : (
        <>
          <TableSearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={(term) => dispatch(setSearchTerm(term))}
            roleFilter={statusFilter}
            setRoleFilter={(filter) => dispatch(setStatusFilter(filter))}
            roles={availableStatusNames}
            FilterTitle="Status"
            SearchTitle="size"
          />
          <TableList
            users={loading ? [] : filteredUnits}
            columnOrder={columnOrder}
            columnTitles={columnTitles}
            loading={loading}
            onDelete={handleDeleteProperty}
            onEdit={handleEditClick}
          />
        </>
      )}
    </div>
  );
};

export default UnitsList;
