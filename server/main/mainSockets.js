const color = require("colors")

require("../auth/auth")
const Player = require('../player/player')
const Bullet = require('../bullet/bullet')

let SOCKET_LIST = {}

const { isUsernameTaken, isValidPassword } = require("../auth/auth");

// ---------- Player ---------- 
Player.list = {}

Player.onConnect = (socket, username) => {
    let numberOfPlayers =  Object.keys(Player.list).length + 1
    let player = new Player(socket.id, username, numberOfPlayers)
    Player.list[socket.id] = player
    console.log(`There are  ${Object.keys(Player.list).length} players online` .yellow)

    socket.on("keyPress", function(data){
        if(data.inputId === "up") player.pressingUp = data.state;
        else if(data.inputId === "down") player.pressingDown = data.state;
        else if(data.inputId === "right") player.pressingRight = data.state;
        else if(data.inputId === "left") player.pressingLeft = data.state;
        else if(data.inputId === "attack") player.pressingAttack = data.state;
        else if(data.inputId === "clientX") player.clientX = data.state;
        else if(data.inputId === "clientY") player.clientY = data.state;
    })
}

Player.onDisconnect = (socket) => {
  delete Player.list[socket.id]
  console.log(`Socket disconnected: ${(socket.id)} ` .blue)
  console.log(`There are  ${Object.keys(Player.list).length} players online` .yellow)
}

Player.update = () => {
    let pack = [];

    for(let i in Player.list){
        let player = Player.list[i]
        player.update()
        pack.push({
            x: player.x,
            y: player.y,
            username: player.username,
            pressingUp: player.pressingUp,
            pressingDown: player.pressingDown,
            pressingRight: player.pressingRight,
            pressingLeft: player.pressingLeft,
            pressingAttack: player.pressingAttack
        })
    }

    return pack;
}

// ---------- Bullet ---------- 

Bullet.list = {}

Bullet.update = () => {
  let pack = [];
  for(let i in Bullet.list){
      let bullet = Bullet.list[i]
      //console.log(Bullet.list[i])
      bullet.update()
      if(bullet.remove === true) delete Bullet.list[i]
      pack.push({
          x: bullet.x,
          y: bullet.y,
          color: bullet.color
      })
  }
  return pack;
}

// ---------- Main ---------- 

function listen(io){
    io.sockets.on("connection", (socket) => {
        socket.id = Math.random();
        SOCKET_LIST[socket.id] = socket

        console.log(`Socket connected: ${(socket.id)} ` .cyan)
        console.log(`There are  ${Object.keys(Player.list).length} players online` .yellow)
        
        socket.on("login", (data) => {
              isValidPassword(data,function(res){
                if(res){
                    Player.onConnect(socket, data.username);
                    socket.emit('loginResponse', {success:true});
                } else {
                    socket.emit('loginResponse', {success:false});			
                }
            });
        });

        socket.on("register", (data) => {
            isUsernameTaken(data,function(res){
                if(res){
                    socket.emit('registrationResponse',{success:false});		
                } else {
                    auth.addUser(data,function(){
                        socket.emit('registrationResponse',{success:true});					
                    });
                }
            });		
        });

        socket.on("signOut", () => {
            Player.onDisconnect(socket);
            delete SOCKET_LIST[socket.id]
            socket.emit('signOutResponse',{success:true})
        })

        socket.on("disconnect", () => {
            Player.onDisconnect(socket);
            delete SOCKET_LIST[socket.id]
        })

        // Chat
        socket.on("sendMessage", (data) => {
            let playerName = ("" + socket.id).slice(2,7)
            for (let i in SOCKET_LIST){
                SOCKET_LIST[i].emit("recieveMessage", playerName + ": " + data)
            }
        });

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
    })
}

// For every player connected loop through SOCKETLIST and update there position
function update(){
    setInterval(function(){
        let pack = {
            player: Player.update(),   
            // bullet: Bullet.update()
        }
        for(let i in SOCKET_LIST){
            let socket = SOCKET_LIST[i]
            socket.emit("newPositions", pack)
        }
        
    }, 1000/25) //25 times per second FPS?
}


module.exports = {
    listen,
    update
}