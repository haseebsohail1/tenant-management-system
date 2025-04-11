import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Property, Unit, Tenant, Document } from "./interface";

interface AdminState {
  users: User[];
  filteredUsers: User[];
  properties: Property[];
  filteredProperties: Property[];
  units: Unit[];
  filteredUnits: Unit[];
  tenants: Tenant[];
  filteredTenants: Tenant[];
  documents: Document[];
  filteredDocuments: Document[];
  loading: boolean;
  searchTerm: string;
  roleFilter: string;
  ownerFilter: string;
  statusFilter: string;
  error: string | null;
  currentUser: User | null;
}

const initialState: AdminState = {
  users: [],
  filteredUsers: [],
  properties: [],
  filteredProperties: [],
  units: [],
  filteredUnits: [],
  tenants: [],
  filteredTenants: [],
  documents: [],
  filteredDocuments: [],
  loading: false,
  searchTerm: "",
  roleFilter: "",
  ownerFilter: "",
  statusFilter: "",
  error: null,
  currentUser: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setFilteredUsers: (state, action: PayloadAction<User[]>) => {
      state.filteredUsers = action.payload;
    },
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
    },
    setFilteredProperties: (state, action: PayloadAction<Property[]>) => {
      state.filteredProperties = action.payload;
    },
    setUnits: (state, action: PayloadAction<Unit[]>) => {
      state.units = action.payload;
    },
    setFilteredUnits: (state, action: PayloadAction<Unit[]>) => {
      state.filteredUnits = action.payload;
    },
    setTenants: (state, action: PayloadAction<Tenant[]>) => {
      state.tenants = action.payload;
    },
    setFilteredTenants: (state, action: PayloadAction<Tenant[]>) => {
      state.filteredTenants = action.payload;
    },
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    setFilteredDocuments: (state, action: PayloadAction<Document[]>) => {
      state.filteredDocuments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
    },
    setOwnerFilter: (state, action: PayloadAction<string>) => {
      state.ownerFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  setUsers,
  setFilteredUsers,
  setProperties,
  setFilteredProperties,
  setUnits,
  setFilteredUnits,
  setTenants,
  setFilteredTenants,
  setDocuments,
  setFilteredDocuments,
  setLoading,
  setSearchTerm,
  setRoleFilter,
  setOwnerFilter,
  setStatusFilter,
  setError,
  setCurrentUser,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
