import { EnvType } from "@/types";

export const config = {
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || "http://localhost:3002",

  CONNECTION_OPTIONS: {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 10000,
  },

  ENABLE_LOGGING: import.meta.env.VITE_ENV_TYPE !== EnvType.PRODUCTION,
};
