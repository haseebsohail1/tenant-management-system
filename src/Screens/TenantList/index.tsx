import React, { useEffect, useState } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import {
  deleteTenantData,
  GetTenantsList,
  AddTenants,
  updateTenantStatus,
} from "@/components/ApiComponent";
import TableHeader from "@/components/TableHeader";
import TableSearchAndFilter from "@/components/SearchFilters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ModalComponent from "@/components/ModalComponent";
import DetailsModalComponent from "@/components/DetailsModalComponent";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  setTenants,
  setFilteredTenants,
  setLoading,
  setSearchTerm,
  setStatusFilter,
} from "@/redux/adminSlice";

import { format } from "date-fns";

const TenantList: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const {
    properties,
    units,
    tenants,
    filteredTenants,
    loading,
    searchTerm,
    statusFilter,
  } = useAppSelector((state: RootState) => state.admin);
  const [availableTenantList, setAvailableTenantList] = useState(false);
  const [availableStatusNames, setAvailableStatusNames] = useState<string[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const columnOrder = [
    "status",
    "startDate",
    "userId",
    "unitId",
    "endDate",
    "createdAt",
  ];
  const columnTitles = {
    status: "Status",
    userId: "User Info",
    unitId: "Unit Info",
    startDate: "Start Date",
    endDate: "End Date",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchUnits = async () => {
      dispatch(setLoading(true));
      try {
        if (session?.token) {
          const response = await GetTenantsList(session?.token);
          const leaseData = response?.data?.result?.data ?? [];

          if (leaseData.length === 0) {
            dispatch(setTenants([]));
            setAvailableTenantList(true);
            return;
          }

          const isLandlord = session?.user?.role === "Landlord";

          const filteredTenants = leaseData
            .filter((tenant: any) => {
              if (!isLandlord) return true;
              return (
                units.some((unit) => unit._id === tenant.unitId?._id) &&
                properties.some(
                  (property) => property._id === tenant.unitId?.propertyId
                )
              );
            })
            .map((tenant: any) => ({
              ...tenant,
              startDate: format(new Date(tenant.startDate), "MM-dd-yyyy"),
              endDate: format(new Date(tenant.endDate), "MM-dd-yyyy"),
            }));

          if (filteredTenants.length > 0) {
            dispatch(setTenants(filteredTenants));
            setAvailableTenantList(false);
          } else {
            dispatch(setTenants([]));
            setAvailableTenantList(true);
          }
        }
      } catch (error) {
        console.error("Error fetching Tenants:", error);
        toast.error("Failed to fetch Tenants.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUnits();
  }, [session, dispatch, properties, units]);

  useEffect(() => {
    const uniqueOwnersSet: Set<string> = new Set(
      tenants.map((unit: any) => unit.status)
    );
    const uniqueStatusArray = Array.from(uniqueOwnersSet);
    setAvailableStatusNames(uniqueStatusArray);
  }, [tenants]);

  useEffect(() => {
    let filtered = [...tenants];

    if (statusFilter) {
      filtered = filtered.filter((tenant) => tenant.status === statusFilter);
    }

    dispatch(setFilteredTenants(filtered));
  }, [tenants, statusFilter, dispatch]);

  const handleDeleteProperty = async (tenantId: any) => {
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
          await deleteTenantData(session.token, tenantId);
          dispatch(
            setTenants(tenants.filter((tenant) => tenant._id !== tenantId))
          );
          toast.success("Tenant Deleted Successfully");
        }
      } catch (error) {
        console.error("Error deleting Tenant:", error);
        toast.error("Failed to Delete Tenant");
      }
    }
  };

  //Model Component

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUnitClick = (unit: any) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Clear selected user
    setSelectedUnit(null); // Clear selected unit
  };

  const inputLabels: Record<
    string,
    {
      label: string;
      type: "date";
    }
  > = {
    startDate: { label: "Start Date", type: "date" },
    endDate: { label: "End Date", type: "date" },
  };

  const selectLabels = {
    unitId: {
      label: "Unit Number and Type",
      options: units
        .filter((unit) => units.some((u) => u._id === unit._id))
        .map((unit) => ({
          label: `${unit.unitNumber} - ${unit.unitType}`,
          value: unit._id,
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
    if (!unit.startDate || !unit.endDate || !unit.unitId) {
      toast.error("All fields are required!");
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await AddTenants(session.token, unit);
      if (response?.data?.result) {
        dispatch(setTenants([...tenants, response.data.result]));
        dispatch(
          setFilteredTenants([...filteredTenants, response.data.result])
        );
        toast.success("Tenant added successfully");
      }
    } catch (error) {
      error;
    } finally {
      dispatch(setLoading(false));
      handleAddClose();
    }
  };
  const isManager = session?.user?.role === "Manager";

  const staticStatusOptions = ["Paid", "Unpaid"];

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "border-green-500 text-green-400";
      case "Unpaid":
        return "border-yellow-500 text-yellow-400";
      default:
        return "text-white border-gray-600";
    }
  };

  const handleStatusChange = async (
    id: string,
    currentStatus: string,
    newStatus: string
  ) => {
    if (currentStatus === newStatus) return;
    if (!session?.token) {
      toast.error("Unauthorized: No session token found");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure you want to change the status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "rgb(31 41 55)",
      color: "white",
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) return;

    const formData = { id, status: newStatus };
    dispatch(setLoading(true));
    try {
      await updateTenantStatus(session.token, formData);

      const updatedDocuments = tenants.map((tenant) =>
        tenant._id === id ? { ...tenant, status: newStatus } : tenant
      );
      dispatch(setTenants(updatedDocuments));
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      {session?.user?.role == "Landlord" ? (
        <>
          <TableHeader
            title="All Tenant List"
            description="A list of registered Tenant."
            onAdd={handleAddClick}
            onAddTitle="Add Tenant"
          />
          <ModalComponent
            isOpen={isAddModalOpen}
            onClose={handleAddClose}
            onSave={handleAddSave}
            headingText="Add Tenant"
            selectLabels={selectLabels}
            inputLabels={inputLabels}
            loading={loading}
          />
        </>
      ) : (
        <TableHeader
          title="All Tenant List"
          description="A list of registered Tenant."
        />
      )}

      <DetailsModalComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        user={selectedUser}
        unit={selectedUnit}
      />
      {availableTenantList ? (
        <div className="p-5 text-gray-400">Tenants List is not available</div>
      ) : (
        <>
          <TableSearchAndFilter
            roleFilter={statusFilter}
            setRoleFilter={(filter) => dispatch(setStatusFilter(filter))}
            roles={availableStatusNames}
            FilterTitle="Status"
          />
          <TableList
            users={
              loading
                ? []
                : filteredTenants.map((tenant) => ({
                    ...tenant,
                    status: isManager ? (
                      <select
                        className={`bg-gray-800 cursor-pointer transition-colors duration-300 focus:none focus:outline-none focus:none px-2 py-1 rounded border ${getStatusBorderColor(
                          tenant.status
                        )}`}
                        value={tenant.status}
                        onChange={(e) =>
                          handleStatusChange(
                            tenant._id,
                            tenant.status,
                            e.target.value
                          )
                        }
                      >
                        {staticStatusOptions.map((statusOption) => (
                          <option
                            className="text-white"
                            key={statusOption}
                            value={statusOption}
                          >
                            {statusOption}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded border ${getStatusBorderColor(
                          tenant.status
                        )}`}
                      >
                        {tenant.status}
                      </span>
                    ),
                    userId: (
                      <span
                        className="underline cursor-pointer"
                        onClick={() =>
                          tenant.userId && handleUserClick(tenant.userId)
                        }
                      >
                        {tenant.userId ? "User Detail" : ""}
                      </span>
                    ),
                    unitId: (
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleUnitClick(tenant.unitId)}
                      >
                        {tenant.unitId ? "Unit Detail" : ""}
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

export default TenantList;
