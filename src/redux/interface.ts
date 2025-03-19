// redux/interfaces.ts
export interface AuthState {
  id: string;
  _id: string | null | undefined;
  role: string | null | undefined;
  email: string | null | undefined;
  token: string | null | undefined;
  user: any;
  isAuthenticated: boolean; // Boolean to indicate authentication status
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
  owner: any;
  manager: any;
  address: any;
  createdAt: any;
  landlordId: any;
  managerId: any;
}
