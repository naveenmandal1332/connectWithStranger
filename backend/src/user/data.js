const TOTAL_USERS = new Set(); // Track of total online user:
const CURRENT_USER = new Set(); // whenever user is greater than 1 then pick two random people and add them into the room
const TOTAL_ACTIVE_ROOMS = {}; // {'roomId': {user1, user2}}; || store roomid as a key with users info as value
const DISCONNECT_USER_INFO = {}; // {id: roomId} || store user socket id as a key and roomId as a value

export { TOTAL_ACTIVE_ROOMS, TOTAL_USERS, CURRENT_USER, DISCONNECT_USER_INFO };
