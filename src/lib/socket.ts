import { envConfig } from "@/config/envConfig";
import { io, Socket } from "socket.io-client";
import { getClientToken } from "./auth/cookies.client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const token = getClientToken();
    socket = io(envConfig.socketUrl!, {
      autoConnect: false,
      transports: ["websocket"],
      auth: token ? { token } : undefined,
    });
  }
  return socket;
};

export const connectSocketWithToken = (token: string): Socket => {
  if (socket) {
    socket.auth = { token };
    if (!socket.connected) {
      socket.connect();
    }
    return socket;
  }

  socket = io(envConfig.socketUrl!, {
    autoConnect: true,
    transports: ["websocket"],
    auth: { token },
  });
  return socket;
};

export const resetSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket.removeAllListeners();
    socket = null;
  }
};
