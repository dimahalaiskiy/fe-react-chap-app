import { Chat } from "@/store/useChatStore";

export const checkChatExistence = (chats: Chat[], chatId: string) => {
  return chats.find((storedChat) => storedChat.id === chatId);
};
