import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1; 
  }
`;

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  animation: ${fadeIn} 0.3s ease forwards;
`;

export const ModalContainer = styled.div`
  background-color: #232528;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease forwards;
`;

export const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  opacity: 0.7;
  font-size: 20px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const ModalContent = styled.div`
  padding: 24px;
  color: #ffffff;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  background-color: ${({ primary }) => (primary ? "#3C7EFF" : "rgba(255, 255, 255, 0.1)")};
  color: ${({ primary }) => (primary ? "#ffffff" : "#ffffff")};

  &:hover {
    background-color: ${({ primary }) => (primary ? "#2D6BE0" : "rgba(255, 255, 255, 0.16)")};
  }
`;
