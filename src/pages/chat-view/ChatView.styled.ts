import styled from "styled-components";

export const ChatViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ChatName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const ChatMessagesContainer = styled.div`
  flex: 1;
  justify-content: flex-end;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MessageContainer = styled.div<{ isCurrentUser: boolean }>`
  align-self: ${(props) => (props.isCurrentUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isCurrentUser ? "#2D88FF" : "#3A3B3F")};
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 70%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  line-height: 1.4;
  word-wrap: break-word;
`;
