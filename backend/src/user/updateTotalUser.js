const updateTotalUser = async (totalUserSet, userId, status) => {
  let res;
  try {
    if (status === "New Join") {
      totalUserSet.add(userId);
    } else {
      totalUserSet.delete(userId);
    }
    res = {
      message: `User ${
        status === "New Join" ? "Added" : "Deleted"
      } Successfully!`,
      success: true,
      data: totalUserSet,
    };
  } catch (error) {
    res = {
      message: error.message,
      success: false
    };
  }
  return res;
};

export default updateTotalUser;
