const path = require('path').resolve('./')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
let io = require("socket.io")(server, {})
let PORT = 3000

module.exports = {
  io
}

app.get("/", function(req, res){
  res.sendFile(__dirname + "/public/index.html" );
})

app.use(express.json())
app.use("/client", express.static(path + '/client'));
app.use(express.static(path + '/server/public'))

//Game Server Files
require("./game")

//Routes
const users = require('./routes/users')
app.use('/', users)

server.listen(PORT)
console.log("Server started on port: " + PORT)