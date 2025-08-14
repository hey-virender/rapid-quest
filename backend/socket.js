import { Server } from "socket.io";
import ProcessedMessage from "./models/ProcessedMessage.js";

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://192.168.0.161:5173",
        process.env.FRONTEND_URL,
      ],
      credentials: true,
    },
  });

  

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    

    socket.on("sendMessage", async(data) => {
      try {
        const { sender, type, text, conversationId,receiver} = data;
        if(!sender||!type||!text||!conversationId) throw new Error("Missing required fields");
        
        const conversationExists = await ProcessedMessage.findOne({ conversation_id: conversationId });
        if (conversationExists) {
          const newMessage = new ProcessedMessage({
            participants: conversationExists.participants,
            message_id: Math.random().toString(36).substring(2, 15), // Generate a random message ID
            sender,
            type,
            text,
            status: "sent",
            conversation_id: conversationId,
            timestamp: new Date(),
          });
          await newMessage.save();
          newMessage.participants.map((user)=>{
            if(user!==sender){
              socket.emit(`newMessage-${user}`, newConversation)
            }
          })
        }else{
          const newConversation = new ProcessedMessage({
            participants: [sender, receiver],
            message_id: Math.random().toString(36).substring(2, 15), // Generate a random message ID
            sender,
            type,
            text,
            status: "sent",
            conversation_id: conversationId,
            timestamp: new Date(),
          });
          await newConversation.save();
          newConversation.participants.map((user)=>{
            if(user!==sender){
              socket.emit(`newMessage-${user}`, newConversation)
            }
          })
          
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    socket.on("converation:read",async(data)=>{
      try {
        const {conversationId,userId} = data
        await ProcessedMessage.updateMany(
          { conversation_id: conversationId, sender: { $ne: userId },status:{$ne:"read"} },
          { $set: { status: "read" } }
        );

        

        
      } catch (error) {
        console.error("Error processing message:", error);
      }

    })
    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);

      try {
        socket.leaveAll();
      } catch (error) {
        console.error(
          "Error cleaning up editing sessions on disconnect:",
          error,
        );
      }
    });
  });

}
