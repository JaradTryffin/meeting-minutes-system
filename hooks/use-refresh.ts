import { create } from "zustand";

interface useRefreshStore {
  refresh: boolean;
  onRefresh: () => void;
}

export const useRefreshHook = create<useRefreshStore>((set) => ({
  refresh: false,
  onRefresh: () => set({ refresh: true }),
}));
