import { useModalStore, ModalType } from "@/store/useModalStore";

export const showModal = (type: ModalType, options: Record<string, any> = {}) => {
  const { openModal } = useModalStore.getState();
  openModal(type, options);
};

export const closeModal = () => {
  const { closeModal } = useModalStore.getState();
  closeModal();
};

export const showConfirmModal = (options: {
  title?: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}) => {
  showModal(ModalType.CONFIRM, options);
};

export const showAlertModal = (options: {
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
}) => {
  showModal(ModalType.ALERT, options);
};

export const showFormModal = (options: {
  title?: string;
  content: React.ReactNode;
  onSubmit?: (data: any) => void;
  confirmText?: string;
  cancelText?: string;
}) => {
  showModal(ModalType.FORM, options);
};
