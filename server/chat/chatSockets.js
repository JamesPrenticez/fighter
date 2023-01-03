const { addUserToRoom, getUserById, userDisconnect } = require("./chat");

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

  //   socket.on("sendMessage", (data) => {
  //     let playerName = ("" + socket.id).slice(2,7)
  //     for (let i in SOCKET_LIST){
  //         SOCKET_LIST[i].emit("recieveMessage", playerName + ": " + data)
  //     }
  // });

    socket.on("sendCommand", (command) => {
        if (command === "help"){
            result = "We would love to help you - /players"
        }
        else if (command === "players"){
            result = "There are " + Object.keys(Player.list).length + " players online"
        } else {
            result = "Try /help for a list of commands"
        }
        socket.emit("recieveCommand", result)
    });

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