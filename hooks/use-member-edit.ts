import { Person } from "@prisma/client";
import { create } from "zustand";

interface useMemberEditStore {
  member: Person;
  setMember: (data: Person) => void;
  reset: () => void;
}

export const useMemberEdit = create<useMemberEditStore>((set) => ({
  member: {
    id: "",
    name: "",
    email: "",
  },
  setMember: (data) => set({ member: { ...data } }),
  reset: () => set({ member: { id: "", name: "", email: "" } }),
}));
