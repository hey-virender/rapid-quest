import { useEffect, useRef } from "react";
import { getSocket, disconnectSocket } from "../lib/socket";

export const useSocket = (onConnect, onDisconnect) => {
  const socketRef = useRef(getSocket());


  useEffect(() => {
    const socket = socketRef.current;

    if (!socket.connected) {
      socket.connect();
    }

    

    if (onConnect) socket.on("connect", onConnect);
    if (onDisconnect) socket.on("disconnect", onDisconnect);

    socket.on("messageSent",)

    return () => {
      if (onConnect) socket.off("connect", onConnect);
      if (onDisconnect) socket.off("disconnect", onDisconnect);
    };
  }, [onConnect, onDisconnect]);

  return {
    socket: socketRef.current,
    disconnect: disconnectSocket,
  };
};
