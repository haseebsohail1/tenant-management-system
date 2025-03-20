import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Property, Unit } from "./interface";

interface AdminState {
  users: User[];
  filteredUsers: User[];
  properties: Property[];
  filteredProperties: Property[];
  units: Unit[];
  filteredUnits: Unit[];
  loading: boolean;
  searchTerm: string;
  roleFilter: string;
  ownerFilter: string;
  statusFilter: string;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  filteredUsers: [],
  properties: [],
  filteredProperties: [],
  units: [],
  filteredUnits: [],
  loading: false,
  searchTerm: "",
  roleFilter: "",
  ownerFilter: "",
  statusFilter: "",
  error: null,
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
  },
});

export const {
  setUsers,
  setFilteredUsers,
  setProperties,
  setFilteredProperties,
  setUnits,
  setFilteredUnits,
  setLoading,
  setSearchTerm,
  setRoleFilter,
  setOwnerFilter,
  setStatusFilter,
  setError,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
