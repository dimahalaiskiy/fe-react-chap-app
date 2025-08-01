import { Modal } from "./Modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title = "Alert",
  content,
  confirmText = "OK",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      onConfirm={onClose}
      confirmText={confirmText}
      showCancelButton={false}
    >
      {content}
    </Modal>
  );
};
