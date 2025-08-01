import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "@/components/chat-sidebar/ChatSidebar";

const ChatsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #232528;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
`;

export const ChatsLayout = () => {
  return (
    <ChatsContainer>
      <Sidebar />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </ChatsContainer>
  );
};
