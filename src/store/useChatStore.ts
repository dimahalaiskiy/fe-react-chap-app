import { create } from "zustand";
import { User } from "@/types";

export interface Chat {
  id: string;
  participants: User[];
  lastMessage: Message;
  unread: number;
  updatedAt: string;
  createdAt: string;
  inputMessage: string;
}

export interface CreateMessage {
  chatId: string;
  content: string;
  senderId: User;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  senderId: string;
  chatId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ChatInputState {
  [chatId: string]: string;
}

interface ChatState {
  chats: Chat[];
  chatInputState: ChatInputState;
  currentChat: Chat | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  addChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  deleteChat: (chatId: string) => void;
  updateChat: (chatId: string, updates: Partial<Chat>) => void;
  setCurrentChat: (chatId: string | null) => void;
  setInputMessage: (chatId: string, message: string) => void;
  markChatAsRead: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  currentChat: null,
  isLoading: true,
  chatInputState: {},

  setLoading: (isLoading) => set({ isLoading }),

  addChats: (chats) => set({ chats }),

  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats],
    })),

  deleteChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
      currentChat: state.currentChat?.id === chatId ? null : state.currentChat,
    })),

  updateChat: (chatId, updates) =>
    set((state) => {
      const updatedChats = state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, ...updates } : chat,
      );
      const updatedCurrentChat =
        state.currentChat?.id === chatId ? { ...state.currentChat, ...updates } : state.currentChat;

      return {
        chats: updatedChats,
        currentChat: updatedCurrentChat,
      };
    }),

  setCurrentChat: (chatId) =>
    set((state) => {
      if (!chatId) return { currentChat: null };
      const chat = state.chats.find((c) => c.id === chatId) || null;
      return { currentChat: chat };
    }),

  markChatAsRead: (chatId) =>
    set((state) => {
      const updatedChats = state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unread: 0 } : chat,
      );

      const updatedCurrentChat =
        state.currentChat?.id === chatId ? { ...state.currentChat, unread: 0 } : state.currentChat;

      return {
        chats: updatedChats,
        currentChat: updatedCurrentChat,
      };
    }),

  setInputMessage: (chatId: string, message: string) =>
    set((state) => ({
      chatInputState: {
        ...state.chatInputState,
        [chatId]: message,
      },
    })),
}));
