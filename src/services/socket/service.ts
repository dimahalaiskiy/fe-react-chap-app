import { Socket } from "socket.io-client";
import { SocketEvents } from "./events";
import { initializeSocket } from "./index";
import { config } from "./config";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useChatStore, Message, Chat } from "@/store/useChatStore";
import { useMessagesStore } from "@/store/useMessagesStore";
import { checkChatExistence } from "@/utils/chat";
import { CreatedChatResponse } from "@/types/response";
import { SocketConnection, useGlobalStore } from "@/store/useGlobalStore";

type EventHandler<T = any> = (data: T) => void;
type AckCallback = (response: any) => void;

class SocketService {
  private socket: Socket | null = null;
  private eventHandlers: Map<string, Set<EventHandler<any>>> = new Map();
  private isInitialized = false;
  private connected = false;
  initialize(userId: string, navigate: (path: string) => void) {
    // Always disconnect previous socket if exists
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = initializeSocket(userId);
    this.setupSocketListeners(navigate);
    this.isInitialized = true;
  }

  private setupSocketListeners(navigate: (path: string) => void) {
    if (!this.socket) return;

    // Connection events
    this.socket.on(SocketEvents.CONNECT, () => {
      this.connected = true;
      const { setSocketConnection } = useGlobalStore.getState();
      setSocketConnection(SocketConnection.CONNECTED);
      if (config.ENABLE_LOGGING) console.log("👁 Socket connected 👁");
      this.emitToHandlers(SocketEvents.CONNECT, null);
    });

    this.socket.on(SocketEvents.RECONNECT, () => {
      this.connected = true;
      const { setSocketConnection } = useGlobalStore.getState();
      setSocketConnection(SocketConnection.CONNECTED);
      if (config.ENABLE_LOGGING) console.log("🔁 Socket reconnected 🔁");
      this.emitToHandlers(SocketEvents.RECONNECT, null);
    });

    this.socket.on(SocketEvents.DISCONNECT, (reason) => {
      this.connected = false;
      const { setSocketConnection } = useGlobalStore.getState();
      setSocketConnection(SocketConnection.DISCONNECTED);
      if (config.ENABLE_LOGGING) console.log("⚠️ Socket disconnected: ", reason);
      this.emitToHandlers(SocketEvents.DISCONNECT, reason);
    });

    this.socket.on(SocketEvents.CONNECT_ERROR, (error) => {
      this.connected = false;
      const { setSocketConnection } = useGlobalStore.getState();
      setSocketConnection(SocketConnection.DISCONNECTED);
      if (config.ENABLE_LOGGING) console.log("⚠️ Socket connection error: ⚠️", error);
      showErrorToast("Connection error. Please check your internet connection.");
      this.emitToHandlers(SocketEvents.CONNECT_ERROR, error);
    });

    // User events
    this.socket.on(SocketEvents.USER_CONNECTED, (data) => {
      if (config.ENABLE_LOGGING) console.log("👽 User connected: 👽", data);
      this.emitToHandlers(SocketEvents.USER_CONNECTED, data);
    });

    this.socket.on(SocketEvents.USER_ONLINE, (data) => {
      if (config.ENABLE_LOGGING) console.log("👽 User online: 👽", data.user);
      this.emitToHandlers(SocketEvents.USER_ONLINE, data.user);
    });

    this.socket.on(SocketEvents.USER_DISCONNECTED, (data) => {
      if (config.ENABLE_LOGGING) console.log("⚠️ User disconnected: ⚠️", data);
      this.emitToHandlers(SocketEvents.USER_DISCONNECTED, data);
    });

    this.socket.on(SocketEvents.USER_TYPING, (data) => {
      this.emitToHandlers(SocketEvents.USER_TYPING, data);
    });

    this.socket.on(SocketEvents.USER_STOP_TYPING, (data) => {
      this.emitToHandlers(SocketEvents.USER_STOP_TYPING, data);
    });

    // Chat events
    this.socket.on(SocketEvents.CHAT_CREATED, (data: CreatedChatResponse) => {
      if (config.ENABLE_LOGGING) console.log("👾 Chat created: 👾", data);

      const { chat, recipientId } = data;
      const { chats, addChat, setCurrentChat } = useChatStore.getState();
      const userStore = JSON.parse(localStorage.getItem("auth-storage") || "{}");
      const userId = userStore?.state?.user?.id;

      const isChatInitiator = recipientId !== userId;

      if (chat && chat.id) {
        const chatExists = checkChatExistence(chats, chat.id);
        if (!chatExists && isChatInitiator) addChat(chat);
        showSuccessToast("Chat created successfully");

        setCurrentChat(chat.id);
        navigate(`/${chat.id}`);
      }

      this.emitToHandlers(SocketEvents.CHAT_CREATED, chat);
    });

    this.socket.on(SocketEvents.CHAT_DELETED, ({ chatId }: { chatId: string }) => {
      if (config.ENABLE_LOGGING) console.log("🔴 Chat deleted: 🔴", chatId);

      if (chatId) {
        const { chats, deleteChat } = useChatStore.getState();
        const chatExists = checkChatExistence(chats, chatId);
        if (chatExists) deleteChat(chatId);
        navigate("/");
      }

      this.emitToHandlers(SocketEvents.CHAT_DELETED, chatId);
    });

    this.socket.on(SocketEvents.CHAT_UPDATED, (chat: Chat) => {
      if (config.ENABLE_LOGGING) console.log("Chat updated:", chat);

      if (chat?.id) {
        const { updateChat } = useChatStore.getState();
        updateChat(chat.id, chat);
      }
      this.emitToHandlers(SocketEvents.CHAT_UPDATED, chat);
    });

    // Message events
    this.socket.on(SocketEvents.MESSAGE_SENT, (message: Message & { chatId: string }) => {
      if (config.ENABLE_LOGGING) console.log("Message received:", message);

      if (message?.id) {
        const { addMessage } = useMessagesStore.getState();
        addMessage(message);
      }
      this.emitToHandlers(SocketEvents.MESSAGE_SENT, message);
    });

    this.socket.on(SocketEvents.MESSAGE_RECEIVED, (message: Message & { chatId: string }) => {
      if (config.ENABLE_LOGGING) console.log("Message sent:", message);

      if (message?.id) {
        const { addMessage } = useMessagesStore.getState();
        addMessage(message);
      }
      this.emitToHandlers(SocketEvents.MESSAGE_RECEIVED, message);
    });

    this.socket.on(SocketEvents.MESSAGE_READ, (data: { chatId: string; messageIds: string[] }) => {
      if (data?.chatId) {
        const { markChatAsRead } = useChatStore.getState();
        markChatAsRead(data.chatId);
      }
      this.emitToHandlers(SocketEvents.MESSAGE_READ, data);
    });

    this.socket.on(SocketEvents.NOTIFICATION_RECEIVED, (data) => {
      if (config.ENABLE_LOGGING) console.log("Notification received:", data);
      this.emitToHandlers(SocketEvents.NOTIFICATION_RECEIVED, data);
    });
  }

  registerHandler<T>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, new Set());
    }

    const handlers = this.eventHandlers.get(eventName);
    if (handlers) {
      handlers.add(handler as EventHandler<any>);
    }

    return () => {
      const currentHandlers = this.eventHandlers.get(eventName);
      if (currentHandlers) {
        currentHandlers.delete(handler as EventHandler<any>);
        if (currentHandlers.size === 0) {
          this.eventHandlers.delete(eventName);
        }
      }
    };
  }

  unregisterHandler(eventName: string, handler: EventHandler<any>): void {
    const handlers = this.eventHandlers.get(eventName);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.eventHandlers.delete(eventName);
      }
    }
  }

  private emitToHandlers<T>(eventName: string, data: T): void {
    const handlers = this.eventHandlers.get(eventName);
    if (!handlers) return;

    handlers.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in socket event handler for ${eventName}:`, error);
      }
    });
  }

  emit(eventName: string, data?: any, callback?: AckCallback): boolean {
    if (this.connected) {
      if (callback) {
        this.socket!.emit(eventName, data, callback);
      } else {
        this.socket!.emit(eventName, data);
      }
      return true;
    } else {
      console.error("Socket not connected. Cannot emit event:", eventName);
      if (callback) {
        callback({ success: false, error: "Socket not connected" });
      }
      return false;
    }
  }

  // Promise-based emit for easier async/await usage
  emitAsync<T = any>(eventName: string, data?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject(new Error("Socket not connected"));
        return;
      }

      this.socket!.emit(eventName, data, (response: T) => {
        if (response && typeof response === "object" && "error" in response) {
          reject(new Error((response as any).error));
        } else {
          resolve(response);
        }
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isInitialized = false;
      this.eventHandlers.clear();

      const { setSocketConnection } = useGlobalStore.getState();
      setSocketConnection(SocketConnection.DISCONNECTED);
    }
  }
}

export const socketService = new SocketService();
