// SOCKET.IO
import io from "../index.js"
let io = server.io
let SOCKET_LIST = {}

// ---------- Socket ---------- 
io.sockets.on("connection", (socket) => {
    socket.id = Math.random();
    console.log("Socket connected " + socket.id);
    SOCKET_LIST[socket.id] = socket;
    
    socket.on("login", (data) => {
		isValidPassword(data,function(res){
			if(res){
				Player.onConnect(socket);
				socket.emit('loginResponse',{success:true});
			} else {
				socket.emit('loginResponse',{success:false});			
			}
		});
    });

    socket.on("register", (data) => {
        isUsernameTaken(data,function(res){
			if(res){
				socket.emit('registrationResponse',{success:false});		
			} else {
				addUser(data,function(){
					socket.emit('registrationResponse',{success:true});					
				});
			}
		});		
    });

    socket.on("disconnect", () => {
        Player.onDisconnect(socket);
    });
    
    socket.on("sendMessage", (data) => {
        var playerName = ("" + socket.id).slice(2,7)
        for (var i in SOCKET_LIST){
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

// For every player connected loop through SOCKETLIST and update there position
setInterval(function(){
    var pack = {
        player: Player.update(),   
        bullet: Bullet.update()
    }

    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i]
        socket.emit("newPositions", pack)
    }
}, 1000/25) //25 times per second FPS?