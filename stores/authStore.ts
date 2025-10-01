import { create } from "zustand";

type LoggedUser = {
  firstName: string,
  lastName: string,
  email: string;
  role: string;
  createdAt: Date
};

type AuthState = {
  user: LoggedUser | null;
  // isAuthenticated: boolean;
  setUser: (user: LoggedUser) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  // isAuthenticated: false,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
