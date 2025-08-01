import { ReactNode, useEffect } from "react";
import {
  DropdownContainer,
  DropdownMenu,
  DropdownItem,
  DropdownItemWithBorder,
} from "./dropdown.styled";

interface DropdownItemProps {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  hasBorder?: boolean;
  children?: ReactNode;
}

interface DropdownProps {
  isOpen: boolean;
  items: DropdownItemProps[];
  onClose: () => void;
}

export const Dropdown = ({ isOpen, items, onClose }: DropdownProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".dropdown-menu")) return;

      onClose();
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (e: React.MouseEvent, onClick: () => void) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <DropdownMenu isOpen={isOpen} className="dropdown-menu">
      {items.map((item, index) => {
        const ItemComponent = item.hasBorder ? DropdownItemWithBorder : DropdownItem;
        return (
          <ItemComponent
            key={index}
            onClick={(e) => handleItemClick(e, item.onClick)}
            disabled={item.isDisabled}
            style={{ opacity: item.isDisabled ? 0.7 : 1 }}
          >
            {item.children || item.label}
          </ItemComponent>
        );
      })}
    </DropdownMenu>
  );
};

export const DropdownWrapper = DropdownContainer;
