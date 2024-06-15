import {
  TOTAL_USERS,
  CURRENT_USER,
  TOTAL_ACTIVE_ROOMS,
  DISCONNECT_USER_INFO,
} from "../user/data.js";
import userDisconnect from "./userDisconnect.js";
import pickedTwoRandomUser from "./pickedTwoRandomUser.js";
import addTwoUserInRoom from "./addTwoUserInRoom.js";
import userReJoin from "./userReJoin.js";

const socketInstance = async (io) => {
  io.on("connection", async (socket) => {
    console.log("New User connected!");

    // Join:
    TOTAL_USERS.add(socket.id);
    CURRENT_USER.add(socket.id);

    // New Join:
    while (CURRENT_USER.size >= 2) {
      // pick two random user:
      const randomUser = await pickedTwoRandomUser(CURRENT_USER);

      // put these two user in a single room:
      const data = await addTwoUserInRoom(randomUser, io);

      // Add them into the room -> client:
      for (const roomId in data) {
        const users = data[roomId];

        const socketId1 = users.user1;
        const socketId2 = users.user2;

        //console.log({ socketId1, socketId2 });

        const socket1 = io.sockets.sockets.get(socketId1);
        const socket2 = io.sockets.sockets.get(socketId2);

        //console.log({ socket1, socket2 });

        if (socket1) socket1.join(roomId);
        if (socket2) socket2.join(roomId);

        if (socket1) socket1.emit("Join", { socketId: socket.id });
        if (socket2) socket2.emit("Join", { socketId: socket.id });

        // send message:
        //socket.on()
      }
    }

    // Re Joining:
    // await userReJoin(socket, io);

    // Disconnect:
    await userDisconnect(socket);

    // User Details:
    console.log("TOTAL_USERS: ", TOTAL_USERS.size);
    console.log("RANDOM_CURRENT_USER", CURRENT_USER.size);
    console.log(
      "TOTAL_ACTIVE_ROOMS",
      Object.entries(TOTAL_ACTIVE_ROOMS).length
    );

    // User Info:
    console.log({ TOTAL_ACTIVE_ROOMS });
    console.log({ DISCONNECT_USER_INFO });
  });
};
export default socketInstance;
