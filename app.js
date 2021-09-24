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
var io = require("socket.io")(server, {});
io.sockets.on("connection", function(socket){
    console.log("Socket connected")

    socket.on("happy", function(data){
        console.log("happy socket " + data.reason)
    })

    socket.emit("serverMsg", {
        msg: "yeah im talking to you!",
    })

})