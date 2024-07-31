import { create } from "zustand";

interface useSheetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMemberSheet = create<useSheetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

