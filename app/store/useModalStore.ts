import { create } from "zustand";

interface ModalStore {
  isCreatePostOpen: boolean;
  isEditProfileOpen: boolean;
  onCloseEditProfile: () => void;
  onOpenEditProfile: () => void;
  setIsCreatePostOpen: (value: boolean) => void;
  setIsEditProfileOpen: (value: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isCreatePostOpen: false,
  isEditProfileOpen: false,
  onCloseEditProfile: () => set({ isEditProfileOpen: false }),
  onOpenEditProfile: () => set({ isEditProfileOpen: true }),
  setIsCreatePostOpen: (value) => set({ isCreatePostOpen: value }),
  setIsEditProfileOpen: (value) => set({ isEditProfileOpen: value }),
}));
