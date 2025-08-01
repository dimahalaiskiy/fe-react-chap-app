import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ChatMessageSkeletons } from "@/components/skeleton/ChatMessageSkeletons";
import { useChatStore } from "@/store/useChatStore";
import {
  ChatViewWrapper,
  ChatHeader,
  ChatName,
  ChatMessagesContainer,
  MessageContainer,
} from "./ChatView.styled";
import { useAuth } from "@/hooks/useAuth";
import { useMessagesStore } from "@/store/useMessagesStore";
import { ChatInput } from "@/components/chat/ChatInput";
import { CoreApiProvider } from "@/services/api";

export const ChatView = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const { markChatAsRead, currentChat } = useChatStore();
  const { messages, addMessages, skip, setSkip, clearMessages } = useMessagesStore();

  const [isLoading, setIsLoading] = useState(false);
  const isChatOpened = currentChat?.id;

  const anotherParticipant = currentChat?.participants.find(
    (participant) => participant.id !== user.id,
  );

  const getMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await CoreApiProvider.getMessages({
        chatId: chatId as string,
        limit: 10,
      });
      const { rows: messages, pagination } = data;
      setSkip(pagination.skip);
      addMessages(messages);
    } catch (error) {
      toast.error("Failed to get messages");
    } finally {
      setIsLoading(false);
    }
  }, [skip]);

  useEffect(() => {
    getMessages();

    return () => {
      clearMessages();
      setSkip(0);
    };
  }, [chatId]);

  return (
    <ChatViewWrapper>
      <ChatHeader>
        <ChatName>{anotherParticipant?.username}</ChatName>
      </ChatHeader>
      <ChatMessagesContainer>
        {isLoading ? (
          <ChatMessageSkeletons amount={8} />
        ) : (
          messages.map((message) => (
            <MessageContainer key={message.id} isCurrentUser={message.senderId === user.id}>
              {message.content}
            </MessageContainer>
          ))
        )}
      </ChatMessagesContainer>
      {isChatOpened && <ChatInput />}
    </ChatViewWrapper>
  );
};
