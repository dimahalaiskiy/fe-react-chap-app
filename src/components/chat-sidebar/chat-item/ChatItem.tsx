import React, { useState } from "react";
import toast from "react-hot-toast";
import { formatTime } from "@/utils/timeUtil";
import { Avatar } from "@/components/avatar/Avatar";
import {
  ChatItemWrapper,
  AvatarContainer,
  ChatPreview,
  ChatHeader,
  ChatName,
  TimeStamp,
  ChatFooter,
  LastMessage,
  UnreadBadge,
} from "./chatItem.styled";
import { User } from "@/types";
import { useChatStore } from "@/store/useChatStore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ContextMenu, ContextMenuProps } from "@/components/context-menu/ContextMenu";
import { ContextMenuItem } from "@/components/context-menu/contextMenu.styled";
import { useSocket } from "@/hooks/useSocket";

interface ChatItemProps {
  id: string;
  participants: User[];
  lastMessage?: {
    content?: string;
    createdAt?: string;
  };
  unread: number;
  createdAt: string;
  isSelected: boolean;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  id,
  participants,
  lastMessage,
  unread,
  createdAt,
  isSelected,
}) => {
  const navigate = useNavigate();
  const { deleteChat: deleteChatSocket } = useSocket();

  const { user } = useAuth();
  const { setCurrentChat, markChatAsRead } = useChatStore();

  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  const anotherParticipant = participants.find((participant) => participant.id !== user.id) as User;

  const openChat = (chatId: string) => {
    setCurrentChat(chatId);
    markChatAsRead(chatId);
    navigate(`/${chatId}`);
  };

  const onDeleteChat = async (chatId: string) => {
    try {
      const deletedChatId = await deleteChatSocket(chatId);

      if (deletedChatId) {
        closeContextMenu();
        toast.success("Chat deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete chat");
    }
  };

  const openContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      isOpen: false,
      position: { x: 0, y: 0 },
    });
  };

  return (
    <>
      <ChatItemWrapper
        onClick={() => openChat(id)}
        className={isSelected ? "selected" : ""}
        data-testid="chat-list-item"
        onContextMenu={openContextMenu}
      >
        <AvatarContainer>
          <Avatar user={anotherParticipant} size={40} />
        </AvatarContainer>
        <ChatPreview>
          <ChatHeader>
            <ChatName>{anotherParticipant?.username}</ChatName>
            <TimeStamp data-testid="message-time">
              {lastMessage?.createdAt && formatTime(lastMessage.createdAt)}
              {!lastMessage?.createdAt && createdAt && formatTime(createdAt)}
            </TimeStamp>
          </ChatHeader>
          <ChatFooter>
            <LastMessage data-testid="message-text">
              {lastMessage?.content || "No messages"}
            </LastMessage>
            {unread > 0 && <UnreadBadge>{unread}</UnreadBadge>}
          </ChatFooter>
        </ChatPreview>
      </ChatItemWrapper>
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
      >
        <div>
          <ContextMenuItem onClick={() => onDeleteChat(id)}>Delete chat</ContextMenuItem>
        </div>
      </ContextMenu>
    </>
  );
};
