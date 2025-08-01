import { Chat } from "@/store/useChatStore";

export interface CreatedChatResponse {
  recipientId: string;
  chat: Chat;
}
