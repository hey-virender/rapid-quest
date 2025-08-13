import dotenv from "dotenv"
dotenv.config({path:".env.local"})
import connectDB from "./config/connectDB.js"
import express from "express"
import { setupSocket } from "./socket.js";
import http from "http";
import cors from "cors";
import messageRoutes from "./routes/message.routes.js";


const app = express()
const server = http.createServer(app);
setupSocket(server);
connectDB()

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://192.168.0.161:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  }),
);
app.use(express.json());

app.use("/api", messageRoutes);

app.get("/", (req, res) => {
    res.send("Hello World")
})

server.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})