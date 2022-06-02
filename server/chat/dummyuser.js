const usersList = []

// adds the user to the specific chatroom
function addUserToRoom(id, username, room) {
  const user = { id, username, room }

  usersList.push(user);
  console.log("userList", usersList)

  return user
}

// gets user by id
function getUserById(id) {
  return usersList.find((user) => user.id === id)
}

// called when the user leaves the chat and deletes the user from usersList array
function userDisconnect(id) {
  const index = usersList.findIndex((user) => user.id === id)

  if (index !== -1) {
    return usersList.splice(index, 1)[0]
  }
}

module.exports = {
  addUserToRoom,
  getUserById,
  userDisconnect,
}