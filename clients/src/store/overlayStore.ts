import { create } from "zustand";

interface IOverlayState {
  isShowOverlay: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
}

export const overlayStore = create<IOverlayState>(set => ({
  isShowOverlay: false,
  showOverlay: () => set({isShowOverlay: true}),
  hideOverlay: () => set({isShowOverlay: false})
}))
