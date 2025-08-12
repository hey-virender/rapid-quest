import { Server } from "socket.io";

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
    const user = socket.user; // Get user
    console.log("User connected:", user.id);

    socket.on("message", (data) => {
      const {text,from,to,conversationId,direction } = data;
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", user.id);

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
