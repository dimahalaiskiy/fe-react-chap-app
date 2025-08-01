import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  gap: 8px;
`;

export const MessageInput = styled.input<{ isLoading?: boolean }>`
  flex: 1;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0px 16px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  height: 40px;
  opacity: ${({ isLoading }) => (isLoading ? 0.7 : 1)};

  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.16);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const SendButton = styled.button<{ isLoading?: boolean }>`
  background-color: #2d88ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 20px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isLoading }) => (isLoading ? 0.7 : 1)};

  &:hover {
    background-color: ${({ isLoading }) => (isLoading ? "#2d88ff" : "#1a73e8")};
  }

  &:disabled {
    background-color: #4a4b50;
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
`;
