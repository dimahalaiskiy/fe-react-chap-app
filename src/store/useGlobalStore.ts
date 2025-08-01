import { create } from "zustand";

export enum SocketConnection {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
}

interface GlobalStore {
  socketConnection: SocketConnection;
  setSocketConnection: (socketConnection: SocketConnection) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  socketConnection: SocketConnection.DISCONNECTED,
  setSocketConnection: (socketConnection: SocketConnection) => set({ socketConnection }),
}));
