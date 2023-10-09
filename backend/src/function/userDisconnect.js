import {
  TOTAL_USERS,
  TOTAL_ACTIVE_ROOMS,
  DISCONNECT_USER_INFO,
  CURRENT_USER,
} from "../user/data.js";

const userDisconnect = async (socket) => {
  socket.on("disconnect", () => {
    // Logs
    console.log(`User is Disconnected with id: ${socket.id}`);

    // Remove from total user:
    TOTAL_USERS.delete(socket.id);

    // Remove User From rooms:
    const roomId = DISCONNECT_USER_INFO[socket.id];
    console.log({ roomId });

    // check if disconnected user in any room:
    if (roomId) {
      const { user1, user2 } = TOTAL_ACTIVE_ROOMS[roomId];

      // Delete Room from active room:
      delete TOTAL_ACTIVE_ROOMS[roomId];

      // Delete both from disconnect user util:
      delete DISCONNECT_USER_INFO[user1];
      delete DISCONNECT_USER_INFO[user2];
    }

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
    console.log({ CURRENT_USER });
  });
};
export default userDisconnect;
