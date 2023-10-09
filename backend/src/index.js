import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import socketInstance from "./function/socketInstace.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to connect with a stranger!");
});

// Main socket connections;
await socketInstance(io);

const PORT = 5001 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Express Server is running at ${PORT}`);
});
