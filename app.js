// EXPRESS
var express = require("express");
var app = express();
var server = require("http").Server(app)
var PORT = 2000

app.get("/", function(req, res){
    res.sendFile(__dirname + "/client/index.html");
})

app.use("/client", express.static(__dirname + "/client"));

server.listen(PORT)

console.log("Server started on port: " + PORT)

// SOCKET.IO

var SOCKET_LIST = {}

var io = require("socket.io")(server, {});
io.sockets.on("connection", function(socket){

    console.log("Socket connected")

    socket.id = Math.random();
    socket.x = 0
    socket.y = 0
    socket.number = "" + Math.floor(10 * Math.random())

    SOCKET_LIST[socket.id] = socket;

    socket.on("disconnect", function(){
        delete SOCKET_LIST[socket.id]
    })
})

// For every player connected loop through SOCKETLIST and update there position
setInterval(function(){
    var pack = [];
    for(var i in SOCKET_LIST){
            var socket = SOCKET_LIST[i]
            socket.x++
            socket.y++
            pack.push({
                x: socket.x,
                y: socket.y,
                number: socket.number
            })
        }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i]
        socket.emit("newPositions", pack)
    }
},1000/25);
