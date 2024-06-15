import {
  TOTAL_USERS,
  CURRENT_USER,
  TOTAL_ACTIVE_ROOMS,
  DISCONNECT_USER_INFO,
} from "../user/data.js";

import pickedTwoRandomUser from "./pickedTwoRandomUser.js";
import addTwoUserInRoom from "./addTwoUserInRoom.js";

const userReJoin = async (socket, io) => {
  try {
    socket.on("Join", async () => {
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

      // User Details:
      console.log("JOIN TOTAL_USERS: ", TOTAL_USERS.size);
      console.log("JOIN RANDOM_CURRENT_USER", CURRENT_USER.size);
    });
  } catch (error) {
    console.log(error);
  }
};
export default userReJoin;
