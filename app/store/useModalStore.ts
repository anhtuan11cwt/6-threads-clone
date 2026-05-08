import { create } from "zustand";

interface ModalStore {
  isEditProfileOpen: boolean;
  onCloseEditProfile: () => void;
  onOpenEditProfile: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isEditProfileOpen: false,
  onCloseEditProfile: () => set({ isEditProfileOpen: false }),
  onOpenEditProfile: () => set({ isEditProfileOpen: true }),
}));
