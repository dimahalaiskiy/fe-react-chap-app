import styled from "styled-components";

const EmptyChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const EmptyStateMessage = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 16px;
`;

const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  svg {
    width: 40px;
    height: 40px;
    color: rgba(255, 255, 255, 0.3);
  }
`;

const EmptyStateSubtext = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  text-align: center;
  max-width: 300px;
`;

export const EmptyChatState = () => {
  return (
    <EmptyChatContainer>
      <EmptyStateIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </EmptyStateIcon>
      <EmptyStateMessage>Select a chat to start messaging</EmptyStateMessage>
      <EmptyStateSubtext>
        Choose a conversation from the sidebar or create a new chat to get started
      </EmptyStateSubtext>
    </EmptyChatContainer>
  );
};
