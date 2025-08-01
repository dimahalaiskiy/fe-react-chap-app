import { ModalType, useModalStore } from "@/store/useModalStore";
import { Modal } from "./Modal";
import { AlertModal } from "./AlertModal";
import { ConfirmModal } from "./ConfirmModal";
import { DefaultModal } from "./DefaultModal";

const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
  [ModalType.ALERT]: AlertModal,
  [ModalType.CONFIRM]: ConfirmModal,
  [ModalType.DEFAULT]: DefaultModal,
};

export const ModalRoot: React.FC = () => {
  const { isOpen, type, data, closeModal } = useModalStore();

  if (!isOpen || !type) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[type];

  if (!ModalComponent) {
    return (
      <Modal
        isOpen={isOpen}
        title={data.title}
        onClose={closeModal}
        onConfirm={data.onConfirm}
        confirmText={data.confirmText}
        cancelText={data.cancelText}
        onCancel={data.onCancel}
      >
        {data.content}
      </Modal>
    );
  }

  return <ModalComponent isOpen={isOpen} onClose={closeModal} {...data} />;
};
