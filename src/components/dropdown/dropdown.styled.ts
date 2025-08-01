import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #232528;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  width: 150px;
  z-index: 10;
  margin-top: 8px;

  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  transform-origin: top center;
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 15px;
  text-align: left;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #ffffff;
  font-size: 14px;
  font-weight: 400;

  &:first-of-type {
    border-radius: 4px 4px 0px 0px;
  }

  &:last-of-type {
    border-radius: 0px 0px 4px 4px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const DropdownItemWithBorder = styled(DropdownItem)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-end-end-radius: 0px;
  border-end-start-radius: 0px;
`;
