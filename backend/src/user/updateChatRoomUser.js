const updateChatRoomUser = async (roomsUser, userId) => {
  // Handle both case Leave chat or disconnect chat:
  let res;
  try {
    const partnerUserId = roomsUser[userId];
    console.log(`${userId} chat with: `, partnerUserId);

    // Remove from roomsUser:
    delete roomsUser[userId];
    delete roomsUser[partnerUserId];

    res = {
      success: true,
      userIds: [userId, partnerUserId],
    };
  } catch (error) {
    console.log(error);
    res = {
      success: false,
      message: error.message,
    };
  }

  return res;
};

export default updateChatRoomUser;
