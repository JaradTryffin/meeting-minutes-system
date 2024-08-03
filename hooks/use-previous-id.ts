import { create } from "zustand";

interface usePreviousMeetingIdStore {
  previousMeetingId: string;
  setPreviousMeetingId: (data: string) => void;
  reset: () => void;
}

export const usePreviousMeetingId = create<usePreviousMeetingIdStore>(
  (set) => ({
    previousMeetingId: "",
    setPreviousMeetingId: (data) => set({ previousMeetingId: data }),
    reset: () => set({ previousMeetingId: "" }),
  }),
);
