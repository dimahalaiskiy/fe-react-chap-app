import { useEffect, useState } from "react";
import { useMessageReceived, useTypingIndicator, Message } from "@/hooks/useSocketEvent";
import {
  Container,
  MessageItem,
  MessageText,
  MessageTime,
  TypingIndicator,
} from "./messageList.styled";

interface MessageListProps {
  chatId: string;
  initialMessages?: Message[];
}

export const MessageList = ({ chatId, initialMessages = [] }: MessageListProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const [receivedMessage, isLoading, error] = useMessageReceived();
  const isTyping = useTypingIndicator(chatId);

  const currentUserId = "currentUser";

  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chatId) {
      setMessages((prev) => [...prev, receivedMessage]);
    }
  }, [receivedMessage, chatId]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (error) {
    return <div>Error loading messages: {error.message}</div>;
  }

  return (
    <Container>
      {isLoading && messages.length === 0 ? (
        <div>Loading messages...</div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} isOwn={message.senderId === currentUserId}>
              <MessageText>{message.content}</MessageText>
              <MessageTime>{formatTime(message.createdAt)}</MessageTime>
            </MessageItem>
          ))}

          {isTyping && <TypingIndicator>Someone is typing...</TypingIndicator>}
        </>
      )}
    </Container>
  );
};
