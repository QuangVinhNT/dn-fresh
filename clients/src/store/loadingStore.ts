import { create } from "zustand";

interface ILoadingState {
  isShowLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const loadingStore = create<ILoadingState>(set => ({
  isShowLoading: false,
  showLoading: () => set({isShowLoading: true}),
  hideLoading: () => set({isShowLoading: false})
}))
