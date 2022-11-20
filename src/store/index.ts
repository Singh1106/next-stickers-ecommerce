import create from "zustand";
import { devtools } from "zustand/middleware";
import { cartItem, initialState, User } from "../types/types";

export enum UserEntryTypes {
  login = 1,
  register = 2,
}

const useAuthStore = create(
  devtools((set) => ({
    user: null,
    isLoggedIn: false,
    userEntryType: UserEntryTypes.login,
    cart: [],
    orders: [],
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
    setCart: (newCart: cartItem[]) =>
      set((state: initialState) => ({
        ...state,
        cart: newCart,
      })),
    setOrders: (newOrders: cartItem[][]) =>
      set((state: initialState) => ({
        ...state,
        orders: newOrders,
      })),
    reset: () =>
      set(() => ({
        user: null,
        isLoggedIn: false,
        userEntryType: UserEntryTypes.login,
        cart: [],
        orders: [],
      })),
  }))
);

export default useAuthStore;
