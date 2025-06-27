import { ProductList } from "@/types/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends ProductList {
  soLuong: number;
}

interface ICartState {
  isShowCart: boolean;
  cart: CartItem[];
  showCart: () => void;
  hideCart: () => void;
  setCart: (cartItems: CartItem[]) => void;
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  increaseQuantity: (foodId: string) => void;
  decreaseQuantity: (foodId: string) => void;
}

export const cartStore = create<ICartState>()(
  persist(
    (set, get) => ({
      isShowCart: false,
      cart: [],
      showCart: () => set({ isShowCart: true }),
      hideCart: () => set({ isShowCart: false }),
      setCart: (cartItems: CartItem[]) => set({ cart: cartItems }),
      addToCart: (cartItem: CartItem) => {
        const existingItem = get().cart.find(item => item.maThucPham === cartItem.maThucPham);
        if (existingItem) {
          set({
            cart: get().cart.map(item => item.maThucPham === cartItem.maThucPham ? { ...item, quantity: item.soLuong + 1 } : item)
          });
        } else {
          set({
            cart: [...get().cart, { ...cartItem }]
          });
        }
      },
      removeFromCart: (foodId: string) => {
        set({
          cart: get().cart.filter(item => item.maThucPham !== foodId)
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      increaseQuantity: (foodId: string) => {
        set({
          cart: get().cart.map(item => item.maThucPham === foodId ? {...item, soLuong: item.soLuong + 1} : item)
        })
      },
      decreaseQuantity: (foodId: string) => {
        set({
          cart: get().cart.map(item => item.maThucPham === foodId ? {...item, soLuong: item.soLuong - 1} : item)
        })
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart })
    }
  )
);
