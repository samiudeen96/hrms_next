import { create } from "zustand";

// Define the shape of modal data
export type ModalData = {
  desc: string;
  buttonName: string;
  color?: string;
  actionType?: string;
  onConfirm?: (actionType?: string) => void;
};

// Define the shape of the UI store
interface UiStore {
  isModalOpen: boolean;
  modalData: ModalData | null;
  isSidebarOpen: boolean;

  openModal: (data: ModalData) => void;
  closeModal: () => void;
  openSidebar: (state: boolean) => void;
}

const useUiStore = create<UiStore>((set) => ({
  isModalOpen: false,
  modalData: null,
  isSidebarOpen: false,

  openModal: (data) => set({ modalData: data, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, modalData: null }),
  openSidebar: (state) => set({ isSidebarOpen: state }),
}));

export default useUiStore;
