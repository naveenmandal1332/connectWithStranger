import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
// import socketInstance from "./function/socketInstace.js";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend is runnig at this
    methods: ["GET", "POST", "PATCH", "PUT"],
  },
});

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );

let waitingUsers = [];
const totalActiveUser = new Set();
const rooms = {};

io.on("connection", (socket) => {
  console.info(` user is connected! `);

  // New User Socket Id:
  const newUserSocketId = socket.id;
  totalActiveUser.add(newUserSocketId);

  // Emit Current Active user:
  io.emit("active-user", { activeUser: totalActiveUser.size });

  // Assign the user to a room
  console.info({ waitingUsers });

  // Create Rooms!:
  socket.on("start-chat", () => {
    if (socket.roomId) {
      console.info(`User ${socket.id} is already in room ${socket.roomId}`);

      // Send Message to Re-load user:
      socket.emit("info", {
        message: "You are already connected to a room",
        textField: true,
        activeUser: totalActiveUser.size,
        roomId: socket.roomId,
      });
      return;
    }

    // Check For If Already in Waiting list:
    if (waitingUsers.includes(socket)) {
      console.info(`User ${socket.id} is already waiting for a partner`);
      socket.emit("info", {
        message: "Waiting for a partner...",
        activeUser: totalActiveUser.size,
        textField: false,
      });
      return;
    }

    if (waitingUsers.length > 0) {
      // Remove the First User From Waiting-List:
      const partner = waitingUsers.shift();

      // Generate Random roomId:
      const roomId = uuidv4();

      const partnerId = partner.id;
      const socketId = socket.id;
      console.info({ newUserSocketId, partnerId, socketId });

      rooms[roomId] = [partner, socket];
      socket.roomId = roomId;
      partner.roomId = roomId;

      partner.join(roomId);
      socket.join(roomId);

      io.to(roomId).emit("info", {
        message: "You are now connected to a room",
        textField: true,
        activeUser: totalActiveUser.size,
        roomId,
      });
      console.info("Active Room", Object.keys(rooms).length);
      console.info("Rooms: ", rooms);
    } else {
      waitingUsers.push(socket);
      console.info("Not Match: ", { users: waitingUsers.length });
      socket.emit("info", {
        message: "Waiting for a partner...",
        activeUser: totalActiveUser.size,
        textField: false,
      });
    }
  });

  // Send Message Event:
  socket.on("message", (data) => {
    if (socket.roomId && rooms[socket.roomId]) {
      const roomId = socket.roomId;
      socket.to(roomId).emit("message", data);
    }
  });

  // User Disconnect Event:
  socket.on("disconnect", () => {
    // Remove Disconnected user from the set:
    totalActiveUser.delete(newUserSocketId);

    if (socket.roomId && rooms[socket.roomId]) {
      const [user1, user2] = rooms[socket.roomId];
      const otherUser = socket === user1 ? user2 : user1;
      if (otherUser) {
        // Emit the message to current user:
        otherUser.emit("info", {
          message: "Your partner has disconnected",
          activeUser: totalActiveUser.size,
          textField: false,
        });
        waitingUsers.push(otherUser);
        otherUser.roomId = null;
      }
      delete rooms[socket.roomId];
      console.info("Inactive Room: ", socket.roomId);
    } else {
      waitingUsers = waitingUsers.filter((user) => user !== socket);
      console.info("Disconnetct ", waitingUsers);
    }

    // Emit Current Active user:
    io.emit("active-user", { activeUser: totalActiveUser.size });
  });

  // Log Total Active User:
  console.info({ totalActiveUser }, "Total Size: ", totalActiveUser.size);
  // socket.on()
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to connect with a stranger!");
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Express Server is running at ${PORT}`);
});
