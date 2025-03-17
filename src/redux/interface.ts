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
