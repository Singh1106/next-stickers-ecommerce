import create from "zustand";
import { devtools } from "zustand/middleware";
import { initialState, User } from "../types/types";

const useAuthStore = create(
  devtools((set) => ({
    user: null,
    setUser: (newUser: User) =>
      set((state: initialState) => ({
        ...state,
        user: newUser,
      })),
  }))
);

export default useAuthStore;
