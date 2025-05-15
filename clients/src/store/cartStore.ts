import { create } from "zustand";

type Cart = {
  foodId: string;
  quantity: number;
}

interface ICartState {
  isShowCart: boolean;
  cartInfo: Cart[];
  showCart: () => void;
  hideCart: () => void;
  addToCart: (cartItem: Cart) => void;
  removeFromCart: (foodId: string) => void;
  increaseQuantity: (foodId: string) => void;
  decreaseQuantity: (foodId: string) => void;
}

export const cartStore = create<ICartState>(set => ({
  isShowCart: false,
  cartInfo: [],
  showCart: () => set({isShowCart: true}),
  hideCart: () => set({isShowCart: false}),
  addToCart: (cartItem: Cart) => set((state) => {
    const existingItem = state.cartInfo.find(item => item.foodId === cartItem.foodId);
    if (existingItem) {
      return {
        cartInfo: state.cartInfo.map(item => item.foodId === cartItem.foodId ? {...cartItem, quantity: cartItem.quantity + item.quantity} : item)
      }
    }
    return {
      cartInfo: [...state.cartInfo, cartItem]
    }
  }),
  removeFromCart: (foodId: string) => set((state) => ({
    cartInfo: state.cartInfo.filter(item => item.foodId !== foodId)
  })),
  increaseQuantity: (foodId: string) => set((state) => ({
    cartInfo: state.cartInfo.map(item => item.foodId === foodId ? {...item, quantity: item.quantity + 1} : item)
  })),
  decreaseQuantity: (foodId: string) => set((state) => ({
    cartInfo: state.cartInfo.map(item => item.foodId === foodId ? {...item, quantity: item.quantity - 1} : item)
  }))
}))
