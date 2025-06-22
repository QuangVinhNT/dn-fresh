import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  id: string;
  fullname: string;
  image: string;
}

type UserStore = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
};

export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({user: null}),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);
