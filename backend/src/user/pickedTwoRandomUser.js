const pickedTwoRandomUser = async(freeUsersSet)=>{
  const usersArray = Array.from(freeUsersSet);
  const pickedUser=[];
  
  while(pickedUser.length < 2){
    const randomIndex = Math.floor(Math.random() * usersArray.length);
    const randomUser = usersArray.splice(randomIndex, 1)[0];
    pickedUser.push(randomUser);
  }

  return pickedUser;

}

export default pickedTwoRandomUser