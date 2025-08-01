import { Modal } from "./Modal";

interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const DefaultModal = ({ isOpen, onClose, title, content }: DefaultModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {content}
    </Modal>
  );
};
