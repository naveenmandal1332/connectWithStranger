import {
  TOTAL_USERS,
  CURRENT_USER,
  TOTAL_ACTIVE_ROOMS,
  DISCONNECT_USER_INFO,
} from "../user/data.js";
import userDisconnect from "./userDisconnect.js";
import pickedTwoRandomUser from "./pickedTwoRandomUser.js";
import addTwoUserInRoom from "./addTwoUserInRoom.js";

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
      await addTwoUserInRoom(randomUser, io);
    }

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
