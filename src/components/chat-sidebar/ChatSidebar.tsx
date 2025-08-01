import { useEffect, useMemo, useCallback } from "react";
import {
  SidebarHeading,
  SidebarWrapper,
  EmptyChats,
  ChatsHeaderWrapper,
  CreateChatButton,
  ChatsList,
} from "./chatSidebar.styled";
import { ReactComponent as CreateChatIcon } from "@/assets/icons/add-chat.svg";
import { ChatListSkeletons } from "@/components/skeleton/ChatListSkeletons";
import { Chat, useChatStore } from "@/store/useChatStore";
import { CoreApiProvider } from "@/services/api";
import { ChatItem } from "./chat-item/ChatItem";
import { useModals } from "@/modals/useModals";
import { useParams } from "react-router-dom";

export const Sidebar = () => {
  const params = useParams();

  const { openCreateChatModal } = useModals();
  const { chats, isLoading, currentChat, addChats, setLoading, setCurrentChat } = useChatStore();

  const hasCurrentChat = useMemo(
    () => currentChat !== null && !params?.chatId,
    [currentChat, params?.chatId],
  );

  const setCurrentChatOnFirstLoad = useCallback(
    (chats: Chat[]) => {
      if (!hasCurrentChat && params.chatId) {
        const chat = chats.find((chat) => {
          return chat.id === params.chatId;
        });
        if (chat) {
          setCurrentChat(chat.id);
        }
      }
    },
    [hasCurrentChat, params.chatId, setCurrentChat],
  );

  const getChats = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await CoreApiProvider.getChats();
      addChats(data);
      setCurrentChatOnFirstLoad(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  }, [addChats, setLoading, setCurrentChatOnFirstLoad]);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <SidebarWrapper>
      <ChatsHeaderWrapper>
        <SidebarHeading>Chats</SidebarHeading>
        <CreateChatButton onClick={openCreateChatModal}>
          <CreateChatIcon width={24} height={24} color="#ffffff" />
        </CreateChatButton>
      </ChatsHeaderWrapper>
      {isLoading ? (
        <ChatListSkeletons amount={4} />
      ) : chats.length === 0 ? (
        <EmptyChats>You have no chats..</EmptyChats>
      ) : (
        <ChatsList>
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              id={chat.id}
              participants={chat.participants}
              lastMessage={chat.lastMessage}
              unread={chat.unread}
              createdAt={chat.createdAt}
              isSelected={currentChat?.id === chat.id}
            />
          ))}
        </ChatsList>
      )}
    </SidebarWrapper>
  );
};
