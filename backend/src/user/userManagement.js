import pickedTwoRandomUser from "./pickedTwoRandomUser.js";
import updateTotalUser from "./updateTotalUser.js";
import updateNonChatRoomUser from "./updateNonChatRoomUser.js";
import updateChatRoomUser from "./updateChatRoomUser.js";

const userManagement = async (
  totalUser,
  nonChatRoomUser,
  chatRoomUser,
  userId,
  status
) => {

  let response;
  try {
    // status: New Join:

    // Update total User:
    let currTotalUser = totalUser;
    if (status === "New Join") {
      const result = await updateTotalUser(totalUser, userId, "New Join");
      if (result.success === true) currTotalUser = result.data;
      else throw new Error("Failed to update total user");
    }
    console.log("Total User: ", currTotalUser);

    // Update Available User (nonChatRommUser):
    let currNonChatRoomUser = nonChatRoomUser;
    if (status === "New Join") {
      const result = await updateNonChatRoomUser(
        nonChatRoomUser,
        userId,
        "New Join"
      );
      if (result.success === true) {
        currNonChatRoomUser = result.data;
      } else {
        throw new Error("Failed to update Non chat room users");
      }
    }
    console.log("Total Non-Chatroom user: ", currNonChatRoomUser);

    // status: Leave: --> chatroom se remove, orther guy if exist then add hoga free me
    if (status === "Leave" || status === "Disconnect") {
      const result = await updateChatRoomUser(chatRoomUser, userId);
      if(result.success === false) throw new Error(result.message);

      // Disconnect: update total user:
      if (status === "Disconnect") {
        const result = await updateTotalUser(totalUser, userId, "Disconnect");
        if (result.success === true)
          console.log("After Disconnect: ", result.data);
        else throw new Error("Failed to update total user");
      }
      // Leave:
      else {
        const result = await updateNonChatRoomUser(
          nonChatRoomUser,
          result.userId,
          "Leave"
        );
        if (result.success === true) {
          currNonChatRoomUser = result.data;
        } else {
          throw new Error("Failed to update Non chat room users");
        }
      }
    }
  } catch (error) {
    console.log(error);
    response = {
      message: error.message
    }
  }

  return response;
};

export default userManagement;
