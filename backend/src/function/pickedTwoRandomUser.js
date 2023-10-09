const pickedTwoRandomUser = async (CURRENT_USER) => {
  try {
    if (CURRENT_USER.size < 2) throw new Error("Not a sufficent user");
    const usersArray = Array.from(CURRENT_USER);
    const twoRandomUser = [];

    while (twoRandomUser.length < 2) {
      const randomIndex = Math.floor(Math.random() * usersArray.length);
      const user = usersArray.splice(randomIndex, 1)[0];
      twoRandomUser.push(user);
      CURRENT_USER.delete(user);
    }

    return twoRandomUser;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
export default pickedTwoRandomUser;
