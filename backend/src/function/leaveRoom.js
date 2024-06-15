import {
  TOTAL_USERS,
  CURRENT_USER,
  TOTAL_ACTIVE_ROOMS,
  DISCONNECT_USER_INFO,
} from "../user/data.js";
const leaveRoom = async (socket, io) => {
  try {
    // Fetch room Id:
    const roomId = DISCONNECT_USER_INFO[socket.id];

    // Fetch Both user socket id:
    const { user1, user2 } = TOTAL_ACTIVE_ROOMS[roomId];

    // No Destroy this room:
    delete TOTAL_ACTIVE_ROOMS[roomId];
    delete DISCONNECT_USER_INFO[user1];
    delete DISCONNECT_USER_INFO[user2];

    //
  } catch (error) {}
};

export default leaveRoom;
