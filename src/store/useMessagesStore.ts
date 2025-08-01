import { create } from "zustand";

interface Message {
  id: string;
  content: string;
  senderId: string;
  chatId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MessagesState {
  messages: Message[];
  isLoading: boolean;
  skip: number;
  setSkip: (cursor: number) => void;
  setLoading: (isLoading: boolean) => void;
  addMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (messageId: string) => void;
  clearMessages: () => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  skip: 0,
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  addMessages: (messages: Message[]) =>
    set((state) => ({
      messages: [...state.messages, ...messages],
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (messageId, updates) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId ? { ...message, ...updates } : message,
      ),
    })),
  deleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    })),
  clearMessages: () =>
    set({
      messages: [],
    }),
  setSkip: (skip) => set({ skip }),
}));
