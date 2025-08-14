import { useEffect, useRef } from "react";
import { getSocket, disconnectSocket } from "../lib/socket";
import useStore from "../store/store";

export const useSocket = (onConnect, onDisconnect) => {
  const myphone = import.meta.env.VITE_PUBLIC_PHONE
  const {updateMessage} = useStore()
  const socketRef = useRef(getSocket());

  const handleNewMessage = (message)=>{
 const {sender,type,text,createdAt,updatedAt,_id,conversation_id} = message
 const newMessage = {sender,type,text,createdAt,updatedAt,_id}
 updateMessage(newMessage,conversation_id)

  }


  useEffect(() => {
    const socket = socketRef.current;

    if (!socket.connected) {
      socket.connect();
    }

   

    if (onConnect) socket.on("connect", onConnect);
    socket.on(`newMessage-${myphone}`,handleNewMessage)
    if (onDisconnect) socket.on("disconnect", onDisconnect);
   

    return () => {
      if (onConnect) socket.off("connect", onConnect);
      if (onDisconnect) socket.off("disconnect", onDisconnect);
      socket.off(`newMessage-${myphone}`,handleNewMessage)
    };
  }, [onConnect, onDisconnect]);

  return {
    socket: socketRef.current,
    disconnect: disconnectSocket,
  };
};
