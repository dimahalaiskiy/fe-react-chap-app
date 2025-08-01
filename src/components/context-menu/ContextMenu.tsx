import React, { useEffect, useRef } from "react";
import { ContextMenuContainer } from "./contextMenu.styled";

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuProps {
  isOpen: boolean;
  position: Position;
  children?: React.ReactNode;
  onClose?: () => void;
  onDelete?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  onClose = () => {},
  children,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ContextMenuContainer
      ref={menuRef}
      className="context-menu-container"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {children}
    </ContextMenuContainer>
  );
};
