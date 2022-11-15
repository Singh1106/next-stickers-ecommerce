import create from "zustand";
import { devtools } from "zustand/middleware";
import { initialState, User } from "../types/types";

export enum UserEntryTypes {
  login = 1,
  register = 2,
}

const useAuthStore = create(
  devtools((set) => ({
    user: null,
    isLoggedIn: false,
    userEntryType: UserEntryTypes.login,
    setUser: (newUser: User) =>
      set((state: initialState) => ({
        ...state,
        user: newUser,
      })),
    setUserEntryType: (newUserEntryType: number) =>
      set((state: initialState) => ({
        ...state,
        userEntryType: newUserEntryType,
      })),
    setIsLoggedIn: (newIsLoggedIn: boolean) =>
      set((state: initialState) => ({
        ...state,
        isLoggedIn: newIsLoggedIn,
      })),
  }))
);

export default useAuthStore;
