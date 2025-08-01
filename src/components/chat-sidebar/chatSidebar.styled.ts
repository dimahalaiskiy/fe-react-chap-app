import styled from "styled-components";

export const SidebarWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  height: calc(100vh - 136px);
  max-height: 1600px;
  background-color: #232528;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const SidebarHeading = styled.h3`
  text-align: center;
  width: 100%;
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  color: #ffffff;
`;

export const EmptyChats = styled.div`
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-weight: 500;
  font-size: 20px;
`;

export const ChatsHeaderWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CreateChatButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  > svg:hover {
    color: #3c7eff;
    transition: color 0.2s ease;
  }
`;

export const ChatsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0px 8px;
`;

export const MessageTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 12px;
  white-space: nowrap;
`;
