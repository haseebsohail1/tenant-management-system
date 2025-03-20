import React, { useEffect, useState } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import { GetUnitsList, deleteUnitData } from "@/components/ApiComponent";
import TableHeader from "@/components/TableHeader";
import TableSearchAndFilter from "@/components/SearchFilters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ModalComponent from "@/components/ModalComponent";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
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
  const { units, filteredUnits, loading, searchTerm, statusFilter } =
    useAppSelector((state: RootState) => state.admin);
  const [availableUnitsList, setAvailableUnitsList] = useState(false);
  const [availableStatusNames, setAvailableStatusNames] = useState<string[]>(
    []
  );

  const columnOrder = [
    "unitNumber",
    "propertyId",
    "size",
    "status",
    "unitType",
    "rentAmount",
    "availableDate",
    "createdAt",
  ];
  const columnTitles = {
    unitNumber: "Unit Number",
    propertyId: "Property Id",
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
          const response = await GetUnitsList(session?.token);
          console.log("unit", response);
          if (response?.data?.result?.length > 0) {
            dispatch(setUnits(response.data.result));
            setAvailableUnitsList(false);
          } else {
            dispatch(setUnits([]));
            setAvailableUnitsList(true);
          }
        }
      } catch (error) {
        console.error("Error fetching units:", error);
        toast.error("Failed to fetch units.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUnits();
  }, [session, dispatch]);

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
    // Implement the logic to add the new unit using your API
    // For example:
    // addNewUnit(session.token, newUser).then(response => {
    //   dispatch(setUnits([...units, response.data]));
    //   toast.success("Unit Added Successfully!");
    // }).catch(error => {
    //   toast.error("Failed to add unit.");
    // })
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
        inputLabels={inputLabels}
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
            roles={availableStatusNames} // Use the dynamically fetched status options
            FilterTitle="Status"
            SearchTitle="size"
          />
          <TableList
            users={loading ? [] : filteredUnits}
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

export default UnitsList;
