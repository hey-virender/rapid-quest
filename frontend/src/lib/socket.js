import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL;

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect()
};

export const isSocketConnected = () => {
  return socket && socket.connected;
};
