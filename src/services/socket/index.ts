import { io, Socket } from "socket.io-client";
import { config } from "./config";
import { SocketEvents } from "./events";

export { SocketEvents };

let socket: Socket | null = null;

export const initializeSocket = (userId: string): Socket => {
  if (socket) {
    return socket;
  }

  socket = io(config.SOCKET_URL, {
    auth: {
      userId,
    },
    withCredentials: true,
    transports: ["websocket", "polling"],
    autoConnect: true,
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = async (): Promise<void> => {
  return new Promise((resolve) => {
    if (socket) {
      if (config.ENABLE_LOGGING) {
        console.log("Disconnecting socket...");
      }

      if (!socket.connected) {
        socket = null;
        resolve();
        return;
      }

      const onDisconnect = () => {
        if (config.ENABLE_LOGGING) {
          console.log("Socket disconnected successfully");
        }
        socket = null;
        resolve();
      };

      socket.once(SocketEvents.DISCONNECT, onDisconnect);
      socket.disconnect();

      setTimeout(() => {
        if (socket) {
          socket.off(SocketEvents.DISCONNECT, onDisconnect);
          socket = null;
          if (config.ENABLE_LOGGING) {
            console.log("Socket disconnect timed out, forcing cleanup");
          }
          resolve();
        }
      }, 1000);
    } else {
      resolve();
    }
  });
};
