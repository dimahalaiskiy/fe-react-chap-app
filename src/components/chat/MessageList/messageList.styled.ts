import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
`;

export const MessageItem = styled.div<{ isOwn: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  max-width: 70%;
  background-color: ${(props) => (props.isOwn ? "#2d88ff" : "#3a3b3f")};
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const MessageText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.4;
  word-wrap: break-word;
`;

export const MessageTime = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
  align-self: flex-end;
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  padding: 8px;
  font-size: 14px;
`;
