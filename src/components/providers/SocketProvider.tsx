"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket, connectSocketWithToken, resetSocket } from "@/lib/socket";
import { getClientToken } from "@/lib/auth/cookies.client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let activeSocket: Socket | null = null;

    const initSocket = () => {
      const token = getClientToken();
      if (!token) {
        // User not logged in — do not attempt socket connection
        if (activeSocket) {
          activeSocket.disconnect();
        }
        setIsConnected(false);
        setSocket(null);
        return;
      }

      activeSocket = connectSocketWithToken(token);
      setSocket(activeSocket);

      const handleConnect = () => setIsConnected(true);
      const handleDisconnect = () => setIsConnected(false);
      const handleConnectError = (err: Error) => {
        // Don't clutter console if token was invalidated
        if (err.message !== "Token missing") {
          console.error("[Socket] Connection error:", err.message);
        }
        setIsConnected(false);
      };

      activeSocket.on("connect", handleConnect);
      activeSocket.on("disconnect", handleDisconnect);
      activeSocket.on("connect_error", handleConnectError);

      if (!activeSocket.connected) {
        activeSocket.connect();
      }
    };

    initSocket();

    // Listen for login/logout events across the app
    const handleAuthChange = () => {
      initSocket();
    };

    window.addEventListener("auth:state-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth:state-change", handleAuthChange);
      if (activeSocket) {
        activeSocket.off("connect");
        activeSocket.off("disconnect");
        activeSocket.off("connect_error");
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
