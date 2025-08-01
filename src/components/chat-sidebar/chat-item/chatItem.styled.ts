import styled from "styled-components";

export const ChatItemWrapper = styled.button`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  min-height: 44px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &.selected {
    background-color: rgba(45, 136, 255, 0.15);
  }
`;

export const AvatarContainer = styled.div`
  margin-right: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  span,
  img {
    border-radius: 50%;
  }
`;

export const ChatPreview = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const ChatName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

export const TimeStamp = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

export const ChatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 22px;
  width: 100%;
  overflow: hidden;
`;

export const LastMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 30px);
`;

export const UnreadBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d88ff;
  color: white;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 11px;
  margin-left: 8px;
`;
