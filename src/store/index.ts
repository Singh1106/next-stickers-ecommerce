import create from "zustand";
import { initialState, User } from "../types/types";

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user: User) =>
    set((state: initialState) => ({
      ...state,
      user,
    })),
}));

export default useAuthStore;
