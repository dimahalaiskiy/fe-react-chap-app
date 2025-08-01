import styled from "styled-components";

export const ContextMenuContainer = styled.div`
  position: fixed;
  background-color: #232528;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  min-width: 150px;
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.15s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ContextMenuItem = styled.button`
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  border: none;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.danger {
    color: #ff4d4f;
  }

  &.danger:hover {
    background-color: rgba(255, 77, 79, 0.1);
  }
`;

export const ContextMenuDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
`;
