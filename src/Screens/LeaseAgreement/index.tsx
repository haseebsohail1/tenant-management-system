import React, { useEffect, useState } from "react";
import TableList from "@/components/TableList";
import { useSession } from "next-auth/react";
import {
  deleteDocumentData,
  GetLeaseAgreementList,
  AddTenants,
  updateDocumentStatus,
} from "@/components/ApiComponent";
import TableHeader from "@/components/TableHeader";
import TableSearchAndFilter from "@/components/SearchFilters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ModalComponent from "@/components/ModalComponent";
import DetailsModalComponent from "@/components/DetailsModalComponent";
import EditModalComponent from "@/components/EditModalComponent";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  setDocuments,
  setFilteredDocuments,
  setLoading,
  setStatusFilter,
} from "@/redux/adminSlice";

import { format } from "date-fns";

const LeaseAgreementList: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const {
    properties,
    units,
    tenants,
    documents,
    filteredDocuments,
    loading,
    searchTerm,
    statusFilter,
  } = useAppSelector((state: RootState) => state.admin);
  const [availableDocumentsList, setAvailableDocumentsList] = useState(false);
  const [availableStatusNames, setAvailableStatusNames] = useState<string[]>(
    []
  );

  const columnOrder = [
    "status",
    "startDate",
    "propertyId",
    "unitId",
    "tenantId",
    "endDate",
    "monthlyRent",
    "createdAt",
  ];
  const columnTitles = {
    status: "Status",
    propertyId: "Property Info",
    unitId: "Unit Info",
    tenantId: "Tenant Info",
    startDate: "Start Date",
    endDate: "End Date",
    monthlyRent: "Monthly Rent",
    createdAt: "Created At",
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      dispatch(setLoading(true));

      try {
        if (!session?.token) return;

        const response = await GetLeaseAgreementList(session.token);
        const leaseData = response?.data?.result?.data ?? [];

        if (leaseData.length === 0) {
          dispatch(setDocuments([]));
          setAvailableDocumentsList(true);
          return;
        }

        const isLandlord = session?.user?.role === "Landlord";

        const filteredDocuments = leaseData
          .filter((doc: any) => {
            if (!isLandlord) return true;
            return properties.some(
              (property) =>
                property?.landlordId?._id === doc?.propertyId?.landlordId
            );
          })
          .map((doc: any) => ({
            ...doc,
            startDate: format(new Date(doc.startDate), "MM-dd-yyyy"),
            endDate: format(new Date(doc.endDate), "MM-dd-yyyy"),
          }));

        if (filteredDocuments.length > 0) {
          dispatch(setDocuments(filteredDocuments));
          setAvailableDocumentsList(false);
        } else {
          dispatch(setDocuments([]));
          setAvailableDocumentsList(true);
        }
      } catch (error) {
        console.error("Error fetching Tenants:", error);
        toast.error("Failed to fetch Tenants.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDocuments();
  }, [session, dispatch, units, properties]);

  useEffect(() => {
    const uniqueOwnersSet: Set<string> = new Set(
      documents.map((unit: any) => unit.status)
    );
    const uniqueStatusArray = Array.from(uniqueOwnersSet);
    setAvailableStatusNames(uniqueStatusArray);
  }, [documents]);

  useEffect(() => {
    let filtered = [...documents];

    if (statusFilter) {
      filtered = filtered.filter((doc) => doc.status === statusFilter);
    }

    dispatch(setFilteredDocuments(filtered));
  }, [documents, searchTerm, statusFilter, dispatch]);

  const handleDeleteProperty = async (documentId: any) => {
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
          await deleteDocumentData(session.token, documentId);
          dispatch(
            setDocuments(
              documents.filter((document) => document._id !== documentId)
            )
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleUnitClick = (unit: any) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const handleTenantClick = (tenant: any) => {
    setSelectedTenant(tenant);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setSelectedUnit(null);
    setSelectedTenant(null);
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
        dispatch(setDocuments([...tenants, response.data.result]));
        dispatch(
          setFilteredDocuments([...filteredDocuments, response.data.result])
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

  const staticStatusOptions = ["Pending", "Active", "Terminated"];

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "Active":
        return "border-green-500 text-green-500";
      case "Pending":
        return "border-yellow-500 text-yellow-500";
      case "Terminated":
        return "border-red-500 text-red-500";
      default:
        return "border-gray-500 text-white";
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
      text: `Current: ${currentStatus}, New: ${newStatus}`,
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
      await updateDocumentStatus(session.token, formData);

      const updatedDocuments = documents.map((doc) =>
        doc._id === id ? { ...doc, status: newStatus } : doc
      );
      dispatch(setDocuments(updatedDocuments));
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
      <TableHeader
        title="All Lease Agreement List"
        description="A list of registered Lease Agreements."
        onAdd={session?.user?.role === "Landlord" ? handleAddClick : undefined}
        onAddTitle={
          session?.user?.role === "Landlord" ? "Add Lease Agreement" : undefined
        }
      />
      {session?.user?.role === "Landlord" && (
        <ModalComponent
          isOpen={isAddModalOpen}
          onClose={handleAddClose}
          onSave={handleAddSave}
          headingText="Add Lease Agreement"
          selectLabels={selectLabels}
          inputLabels={inputLabels}
          loading={loading}
        />
      )}

      <DetailsModalComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        property={selectedProperty}
        unit={selectedUnit}
        tenant={selectedTenant}
      />
      {availableDocumentsList ? (
        <div className="p-5 text-gray-400">Documents List is not available</div>
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
                : filteredDocuments.map((document) => ({
                    ...document,
                    status: isManager ? (
                      <select
                        className={`bg-gray-800 cursor-pointer transition-colors duration-300 focus:none focus:outline-none focus:none  px-2 py-1 rounded border ${getStatusBorderColor(
                          document.status
                        )}`}
                        value={document.status}
                        onChange={(e) =>
                          handleStatusChange(
                            document._id,
                            document.status,
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
                          document.status
                        )}`}
                      >
                        {document.status}
                      </span>
                    ),
                    propertyId: (
                      <span
                        className="underline cursor-pointer"
                        onClick={() =>
                          document.propertyId &&
                          handlePropertyClick(document.propertyId)
                        }
                      >
                        {document.propertyId ? "Property Detail" : ""}
                      </span>
                    ),
                    unitId: (
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleUnitClick(document.unitId)}
                      >
                        {document.unitId ? "Unit Detail" : ""}
                      </span>
                    ),
                    tenantId: (
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleTenantClick(document.tenantId)}
                      >
                        {document.tenantId ? "Tenant Detail" : ""}
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

export default LeaseAgreementList;
