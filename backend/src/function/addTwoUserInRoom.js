import { v4 as uuidv4 } from "uuid";
import { TOTAL_ACTIVE_ROOMS, DISCONNECT_USER_INFO } from "../user/data.js";

const addTwoUserInRoom = async (userId, io) => {
  try {
    const user1 = userId[0];
    const user2 = userId[1];

    // Generate room id:
    const roomId = uuidv4();

    // Add user 1 to the room
    const socket1 = io.sockets.sockets.get(user1);

    // Add user 2 to the same room;
    const socket2 = io.sockets.sockets.get(user2);

    // Check if the sockets exist and are connected then Add both sockets to the same room
    if (socket1 && socket1.connected && socket2 && socket2.connected) {
      socket1.join(roomId);
      socket2.join(roomId);
    } else {
      console.log("One or both sockets are not connected.");
    }

    // Add to Active rooms:
    const singleRomm = {};
    singleRomm[roomId] = { user1: user1, user2: user2 };

    TOTAL_ACTIVE_ROOMS[roomId] = { user1: user1, user2: user2 };
    DISCONNECT_USER_INFO[user1] = roomId;
    DISCONNECT_USER_INFO[user2] = roomId;

    // Put into chat room:
    //console.log("Aticve user-> ", singleRomm);
    // io.sockets.sockets.join(roomId);

    // To get socket info using room id:
    // const room = io.sockets.adapter.rooms.get(roomId);
    // console.log({ room });
    return singleRomm;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
export default addTwoUserInRoom;
