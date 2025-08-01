import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { InputContainer, MessageInput, SendButton } from "./chatInput.styled";
import { Chat, useChatStore } from "@/store/useChatStore";

export const ChatInput: React.FC = () => {
  const [isSending, setIsSending] = useState(false);

  const { sendMessage } = useSocket();
  const { currentChat, setInputMessage, chatInputState } = useChatStore();
  const { id: currentChatId } = currentChat as Chat;

  const message = chatInputState[currentChatId] || "";

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    try {
      const result = await sendMessage(currentChatId, message.trim());

      if (result) {
        setInputMessage(currentChatId, "");
        toast.success("Message sent!");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputMessage(currentChatId, newValue);
  };

  return (
    <InputContainer>
      <MessageInput
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      />
      <SendButton disabled={!message} onClick={handleSendMessage}>
        Send
      </SendButton>
    </InputContainer>
  );
};
