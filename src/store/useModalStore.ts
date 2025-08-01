import { create } from "zustand";
import { ReactNode } from "react";

export enum ModalType {
  CONFIRM = "confirm",
  ALERT = "alert",
  FORM = "form",
  DEFAULT = "default",
}

interface ModalData {
  title?: string;
  content?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  [key: string]: any;
}

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data: ModalData;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  openModal: (type, data = {}) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null, data: {} }),
}));
