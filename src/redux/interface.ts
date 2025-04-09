// redux/interfaces.ts
export interface AuthState {
  id: string;
  _id: string | null | undefined;
  role: string | null | undefined;
  email: string | null | undefined;
  token: string | null | undefined;
  user: any;
  isAuthenticated: boolean;
}

export interface User {
  _id: any;
  name: string;
  email: any;
  role: any;
  createdAt: any;
}

export interface Property {
  _id: any;
  name: any;
  address: any;
  createdAt: any;
  landlordId: any;
  managerId: any;
}

export interface Unit {
  _id: any;
  propertyId: any;
  unitNumber: any;
  size: any;
  availableDate: any;
  status: any;
  unitType: any;
  rentAmount: any;
  createdAt: any;
}

export interface Tenant {
  _id: any;
  status: any;
  userId: any;
  unitId: any;
  startDate: any;
  endDate: any;
  createdAt: any;
}
export interface Document {
  _id: any;
  status: any;
  propertyId: any;
  unitId: any;
  tenantId: any;
  startDate: any;
  endDate: any;
  monthlyRent: any;
  createdAt: any;
}
