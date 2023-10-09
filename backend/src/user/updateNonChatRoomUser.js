const updateNonChatRoomUser = async (totalFreeUser, userId, status) => {
  let res;
  try {
    
    for(let ind=0; ind<userId.length; ind++){
      if (status === "New Join" || status === "Leave") {
        totalFreeUser.add(userId[ind]);
      } else if (status === "Picked") {
        totalFreeUser.delete(userId[ind]);
      }
    }

    res = {
      message: `User ${
        status === "New Join" || status === "Leave" ? "Added" : "Deleted"
      } Successfully!`,
      data: totalFreeUser,
      success: true,
    };
  } catch (error) {
    res = {
      message: error.message,
      success: false,
    };
  }

  return res;
};
export default updateNonChatRoomUser;
