import { useEffect, useRef } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalFooter,
  ModalButton,
} from "./modal.styled";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  showCancelButton?: boolean;
  cancelText?: string;
  onCancel?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  onConfirm,
  confirmText = "Confirm",
  showCancelButton = false,
  cancelText = "Cancel",
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer ref={modalRef}>
        <ModalHeader>
          <ModalTitle>{title || "Modal"}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        {(onConfirm || showCancelButton) && (
          <ModalFooter>
            {showCancelButton && <ModalButton onClick={handleCancel}>{cancelText}</ModalButton>}
            {onConfirm && (
              <ModalButton primary onClick={handleConfirm}>
                {confirmText}
              </ModalButton>
            )}
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};
