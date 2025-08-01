import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { DialogLayoutWrapper } from "./dialogLayout.styled";

interface DialogLayoutProps {
  isOpen: boolean;
  children: JSX.Element;
  title?: string;
  onClose: () => void;
}

export const DialogLayout: React.FC<DialogLayoutProps> = ({ isOpen, onClose, children, title }) => {
  const modalRoot = document.getElementById("modal-root");
  const modalElement = document.createElement("div");

  useEffect(() => {
    if (!modalRoot) return;

    modalRoot.appendChild(modalElement);

    return () => {
      modalRoot.removeChild(modalElement);
    };
  }, [modalElement, modalRoot]);

  return isOpen
    ? ReactDOM.createPortal(
        <DialogLayoutWrapper>
          <div className="modal">
            <button className="close-button" onClick={onClose}>
              Close
            </button>
            {title && <h2>{title}</h2>}
            {children}
          </div>
        </DialogLayoutWrapper>,
        modalElement,
      )
    : null;
};

export default DialogLayout;
