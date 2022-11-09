import create from "zustand";

interface User {
  name: string;
  email: string;
  age: number;
}

export interface initialState {
  user: User;
}

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user: User) =>
    set((state: initialState) => ({
      ...state,
      user,
    })),
}));

export default useAuthStore;
