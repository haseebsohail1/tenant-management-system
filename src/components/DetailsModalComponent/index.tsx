import React from "react";
import Button from "../Button/Button";
import { format } from "date-fns";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  isVerified: string;
  createdAt: string;
}

interface UnitDetails {
  unitNumber: string;
  unitType: string;
  size: string;
  status: string;
  rentAmount: string;
  availableDate: string;
  createdAt: string;
}

interface landlordDetails {
  name: string;
  email: string;
  role: string;
  phone: string;
  isVerified: string;
  createdAt: string;
}

interface managerDetails {
  name: string;
  email: string;
  role: string;
  phone: string;
  isVerified: string;
  createdAt: string;
}

interface tenantDetails {
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
}

interface propertyDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  createdAt: string;
}

interface DetailsModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserDetails | null;
  unit?: UnitDetails | null;
  landlord?: landlordDetails | null;
  manager?: managerDetails | null;
  property?: propertyDetails | null;
  tenant?: tenantDetails | null;
}

const DetailsModalComponent: React.FC<DetailsModalComponentProps> = ({
  isOpen,
  onClose,
  user,
  unit,
  landlord,
  manager,
  property,
  tenant,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center w-full justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-5 sm:align-middle lg:w-[700px] w-full">
          <div className="p-5 text-white">
            {user ? (
              <div className="gap-3 flex flex-col">
                <h3 className=" text-lg text-yellow-500">User Info</h3>
                <div className="flex flex-col gap-2">
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Name:</strong>{" "}
                    {user.name}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Email:</strong>{" "}
                    {user.email}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Phone:</strong>{" "}
                    {user.phone}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400 underline">
                      Verified:
                    </strong>
                    {user.isVerified ? (
                      <span style={{ color: "lightgreen" }}>True</span>
                    ) : (
                      <span style={{ color: "lightcoral" }}>False</span>
                    )}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      created At:
                    </strong>
                    {user.createdAt}
                  </span>
                </div>
              </div>
            ) : null}

            {unit ? (
              <div className="gap-3 flex flex-col">
                <h3 className=" text-lg text-yellow-500">Unit Info</h3>
                <div className="flex flex-col gap-2">
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      Unit Number:
                    </strong>{" "}
                    {unit.unitNumber}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      Unit Type:
                    </strong>{" "}
                    {unit.unitType}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Size:</strong>{" "}
                    {unit.size}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400 underline">Status:</strong>
                    {unit.status}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400 underline">
                      Rent Amount:
                    </strong>
                    {unit.rentAmount}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400 underline">
                      Available Date:
                    </strong>
                    {format(new Date(unit.availableDate), "MM/dd/yyyy")}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      created At:
                    </strong>
                    {unit.createdAt}
                  </span>
                </div>
              </div>
            ) : null}

            {landlord ? (
              <div className="gap-3 flex flex-col">
                <h3 className=" text-lg text-yellow-500">Landlord Info</h3>
                <div className="flex flex-col gap-2">
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Name:</strong>{" "}
                    {landlord.name}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Email:</strong>{" "}
                    {landlord.email}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Role:</strong>{" "}
                    {landlord.role}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Phone:</strong>{" "}
                    {landlord.phone}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400 underline">
                      Verified:
                    </strong>
                    {landlord.isVerified ? (
                      <span style={{ color: "lightgreen" }}>True</span>
                    ) : (
                      <span style={{ color: "lightcoral" }}>False</span>
                    )}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      created At:
                    </strong>
                    {landlord.createdAt}
                  </span>
                </div>
              </div>
            ) : null}

            {manager ? (
              <div className="gap-3 flex flex-col">
                <h3 className=" text-lg text-yellow-500">Landlord Info</h3>
                <div className="flex flex-col gap-2">
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Name:</strong>{" "}
                    {manager.name}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Email:</strong>{" "}
                    {manager.email}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Role:</strong>{" "}
                    {manager.role}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Phone:</strong>{" "}
                    {manager.phone}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400 underline">
                      Verified:
                    </strong>
                    {manager.isVerified ? (
                      <span style={{ color: "lightgreen" }}>True</span>
                    ) : (
                      <span style={{ color: "lightcoral" }}>False</span>
                    )}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      created At:
                    </strong>
                    {manager.createdAt}
                  </span>
                </div>
              </div>
            ) : null}

            {tenant ? (
              <div className="gap-3 flex flex-col">
                <h3 className=" text-lg text-yellow-500">Tenant Info</h3>
                <div className="flex flex-col gap-2">
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      Start Date:
                    </strong>{" "}
                    {tenant.startDate}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      End Date:
                    </strong>{" "}
                    {tenant.endDate}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      Status:
                    </strong>{" "}
                    {tenant.status}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      created At:
                    </strong>
                    {tenant.createdAt}
                  </span>
                </div>
              </div>
            ) : null}

            {property ? (
              <div className="gap-3 flex flex-col">
                <h3 className=" text-lg text-yellow-500">Property Info</h3>
                <div className="flex flex-col gap-2">
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">Name:</strong>{" "}
                    {property.name}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      Address:
                    </strong>{" "}
                    {property.address}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">City:</strong>{" "}
                    {property.city}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">State:</strong>{" "}
                    {property.state}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      Country:
                    </strong>{" "}
                    {property.country}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      Zip Code:
                    </strong>{" "}
                    {property.zipcode}
                  </span>
                  <span className="text-mediumn  flex flex-row gap-5">
                    <strong className="text-gray-400  underline">
                      created At:
                    </strong>
                    {property.createdAt}
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Close Button */}
          <div className="bg-gray-700 px-4 py-3 flex gap-4 flex-row justify-end">
            <Button
              type="button"
              className="rounded-md shadow-sm px-6 py-2 bg-gray-800 font-medium text-gray-700 hover:bg-gray-500  focus:none text-white"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModalComponent;
