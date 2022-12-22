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
    isUserLoggedIn: false,
    userEntryType: UserEntryTypes.login,
    cart: [],
    orders: [],
    products: [],
    activeProductPage: 1,
    verificationMailSent: false,
    expiryVerificationMail: new Date(),
    isAdmin: false,
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
    setIsUserLoggedIn: (newIsUserLoggedIn: boolean) =>
      set((state: initialState) => ({
        ...state,
        isUserLoggedIn: newIsUserLoggedIn,
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
    setProducts: (newProducts: any) =>
      set((state: initialState) => ({
        ...state,
        products: newProducts,
      })),
    setActiveProductPage: (newActivePage: number) =>
      set((state: initialState) => ({
        ...state,
        activeProductPage: newActivePage,
      })),
    setVerificationMailSent: (newVerificationMailSent: boolean) =>
      set((state: initialState) => ({
        ...state,
        verificationMailSent: newVerificationMailSent,
      })),
    setExpiryVerificationMail: (setExpiryVerificationMail: Date) =>
      set((state: initialState) => ({
        ...state,
        expiryVerificationMail: setExpiryVerificationMail,
      })),
    setIsAdmin: (newIsAdmin: Boolean) =>
      set((state: initialState) => ({
        ...state,
        isAdmin: newIsAdmin,
      })),
    reset: () =>
      set((state: initialState) => ({
        ...state,
        user: null,
        isUserLoggedIn: false,
        userEntryType: UserEntryTypes.login,
        cart: [],
        orders: [],
        products: [],
        activeProductPage: 1,
        verificationMailSent: false,
        isAdmin: false,
      })),
  }))
);

export default useAuthStore;
