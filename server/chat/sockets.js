const { addUserToRoom, getUserById, userDisconnect } = require("./dummyuser");

//initializing the socket io connection 
function listen(io){
  io.on("connect", (socket) => {
    //for a new user joining the room
    socket.on("joinRoom", ({ username, roomname }) => {
      // create user
      const user = addUserToRoom(socket.id, username, roomname)
      socket.join(user.room);

      //display a welcome message to the user who joined a room
      socket.emit("message", {
        userId: "007",
        username: "admin",
        text: `Welcome ${user.username}`,
        color: "red"
      })

      // display a joined room message to all other room users except that particular user
      socket.broadcast.to(user.room).emit("message", {
        userId: "007",
        username: "admin",
        text: `${user.username} has joined the chat`,
        color: "red"
      })
    })

    // user sending message
    socket.on("sendMessage", (text) => {
      //gets the room user and the message they want to send
      const user = getUserById(socket.id)

      io.to(user.room).emit("message", {
        userId: user.id,
        username: user.username,
        text: text,
      })
    })

    // user exits the room
    socket.on("disconnect", () => {
      // the user is deleted from array of users and a left room message displayed
      const user = userDisconnect(socket.id)

      if (user) {
        io.to(user.room).emit("message", {
          userId: user.id,
          username: user.username,
          text: `${user.username} has left the room`,
        })
      }
    })
  })
  }

  module.exports = {
    listen,
  }