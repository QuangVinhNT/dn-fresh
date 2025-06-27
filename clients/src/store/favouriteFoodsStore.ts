import { ProductList } from "@/types/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IFavouriteFoodState {
  favouriteFoods: ProductList[];
  setFavouriteFoods: (favouriteFoods: ProductList[]) => void;
  addToFavouriteFoods: (favouriteFood: ProductList) => void;
  removeFromFavouriteFoods: (foodId: string) => void;
  clearFavouriteFoods: () => void;
}

export const favouriteFoodsStore = create<IFavouriteFoodState>()(
  persist(
    (set, get) => ({
      favouriteFoods: [],
      setFavouriteFoods: (favouriteFoods: ProductList[]) => set({ favouriteFoods }),
      addToFavouriteFoods: (favouriteFood: ProductList) => {
        set({
          favouriteFoods: [...get().favouriteFoods, { ...favouriteFood }]
        });
      },
      removeFromFavouriteFoods: (foodId: string) => {
        set({
          favouriteFoods: get().favouriteFoods.filter(item => item.maThucPham !== foodId)
        });
      },
      clearFavouriteFoods: () => {
        set({ favouriteFoods: [] });
      },
    }),
    {
      name: 'favourite-foods-storage',
      partialize: (state) => ({ favouriteFoods: state.favouriteFoods })
    }
  )
);
