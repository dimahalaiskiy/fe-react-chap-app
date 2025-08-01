import { useEffect } from "react";
import { socketService } from "@/services/socket/service";
import { SocketEvents } from "@/services/socket/events";

export const useSocketEvent = <T = any>(eventName: string, handler: (data: T) => void) => {
  useEffect(() => {
    const unregister = socketService.registerHandler<T>(eventName, handler);
    return unregister;
  }, [eventName, handler]);
};

export const useSocket = () => {
  const emit = (eventName: string, data?: any, callback?: (response: any) => void) => {
    return socketService.emit(eventName, data, callback);
  };

  const emitAsync = <T = any>(eventName: string, data?: any): Promise<T> => {
    return socketService.emitAsync<T>(eventName, data);
  };

  const createChat = async (recipientId: string) => {
    try {
      const response = await emitAsync(SocketEvents.CHAT_CREATE, { recipientId });
      return response;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      const response = await emitAsync(SocketEvents.CHAT_DELETE, { chatId });
      return response;
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  };

  const sendMessage = async (chatId: string, content: string) => {
    try {
      const response = await emitAsync(SocketEvents.MESSAGE_SEND, { chatId, content });
      return response;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  const setUserTyping = (chatId: string) => {
    emit(SocketEvents.USER_TYPING, { chatId });
  };

  const setUserStopTyping = (chatId: string) => {
    emit(SocketEvents.USER_STOP_TYPING, { chatId });
  };

  const markMessagesAsRead = async (chatId: string, messageIds: string[]) => {
    try {
      const response = await emitAsync(SocketEvents.MESSAGE_READ, { chatId, messageIds });
      return response;
    } catch (error) {
      console.error("Error marking messages as read:", error);
      throw error;
    }
  };

  return {
    emit,
    emitAsync,
    createChat,
    deleteChat,
    sendMessage,
    setUserTyping,
    setUserStopTyping,
    markMessagesAsRead,
  };
};
