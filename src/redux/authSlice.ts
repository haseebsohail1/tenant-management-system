// redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./interface"; // Import the interface

const initialState: AuthState = {
  id: "",
  _id: "",
  role: "",
  email: "",
  token: "",
  user: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Omit<AuthState, "isAuthenticated">>) {
      // Set user data on login
      state.id = action.payload.id;
      state._id = action.payload._id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      // Clear user data on logout
      state.id = "";
      state._id = "";
      state.role = "";
      state.email = "";
      state.token = "";
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
