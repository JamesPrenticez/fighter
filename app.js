// EXPRESS
var express = require("express");
var app = express();
var server = require("http").Server(app)
var PORT = 3000
let canvasX = 500
let canvasY = 500

app.get("/", function(req, res){
    res.sendFile(__dirname + "/client/index.html");
})

app.use(express.static(__dirname + '/client'));
server.listen(PORT)

console.log("Server started on port: " + PORT)

// SOCKET.IO
var SOCKET_LIST = {}

// ---------- PLayer ---------- 
class Player{
    constructor(id, number = 1, clientX, clientY){
        this.id = id
        this.x = 250,
        this.y = 250,
        this.r = 25,
        this.number = number,
        this.pressingUp = false,
        this.pressingDown = false,
        this.pressingRight = false,
        this.pressingLeft = false,
        this.pressingAttack = false,
        this.cooldown = false,
        this.clientX = clientX,
        this.clientY = clientY,
        this.maxSpeed = 20

    }

    update(){
        this.updatePosition()
        this.shootBullet()
    }

    updatePosition(){
        // Increase/decrease x/y coordinates
        if(this.pressingLeft) this.x -= this.maxSpeed 
        if(this.pressingRight) this.x += this.maxSpeed 
        if(this.pressingUp) this.y -= this.maxSpeed
        if(this.pressingDown) this.y += this.maxSpeed 

        // Keep within canvas bounds
        if (this.x - this.r < 0.0) { this.x = this.r;} // Left boundary: x:0
        if (this.x + this.r > canvasX) {this.x = canvasX - this.r} // Right boundary: x:500
        if (this.y - this.r < 0.0) { this.y = this.r } // Top boundary: y:0
        if (this.y + this.r > canvasY) { this.y = canvasY - this.r } // Bottom boundary: y:500
    }

    shootBullet(){
        if (this.pressingAttack === true && this.cooldown === false) {
            var angle = Math.atan2(
                this.clientY - this.y,
                this.clientX - this.x
            ) / Math.PI * 180

            var bullet = new Bullet(this.x, this.y, this.id, angle)
            Bullet.list[bullet.id] = bullet

            this.cooldown = true;
            setTimeout(() => this.cooldown = false, 300);
        }
    }
    


}

Player.list = {}

Player.onConnect = (socket) => {
    var numberOfPlayers =  Object.keys(Player.list).length + 1
    var player = new Player(id = socket.id, number = numberOfPlayers)
    Player.list[socket.id] = player
    console.log("There are " + Object.keys(Player.list).length + " players online")

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
    console.log("Socket disconnected " + socket.id)
    delete SOCKET_LIST[socket.id]
    delete Player.list[socket.id]
    console.log("There are " + Object.keys(Player.list).length + " players online")
}

Player.update = () => {
    var pack = [];
    for(var i in Player.list){
        var player = Player.list[i]
        player.update()
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number
        })
    }
    return pack;
}

// ---------- Bullets ---------- 
class Bullet{
    constructor(x, y, owner, angle){
        this.id = Math.random();
        this.x = x,
        this.y = y,
        this.owner = owner
        this.angle = angle;
        this.speedX = Math.cos(this.angle/180*Math.PI)*10;
        this.speedY = Math.sin(this.angle/180*Math.PI)*10;
        this.timer = 0
        this.remove = false
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    }

    update(){
        this.updatePosition()
        this.checkCollision()

    }

    updatePosition(){
        if(this.timer++ > 100) this.remove = true
        this.x = this.x + this.speedX
        this.y = this.y + this.speedY
    }

    getDistance(point){
        return Math.sqrt(Math.pow(this.x - point.x,2) + Math.pow(this.y - point.y,2))
    }

    checkCollision(){
        for(var i in Player.list){
            var player = Player.list[i]
            if(this.getDistance(player) < 32 && this.owner !== player.id){
                //handle collision eg. hp--
                this.remove = true
            }
        }
    }
}

Bullet.list = {}

Bullet.update = () => {
    var pack = [];
    for(var i in Bullet.list){
        var bullet = Bullet.list[i]
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

// ---------- Socket ---------- 
var io = require("socket.io")(server, {});

io.sockets.on("connection", (socket) => {
    
    socket.id = Math.random();
    console.log("Socket connected " + socket.id);
    SOCKET_LIST[socket.id] = socket;
    
    Player.onConnect(socket);
    
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
},1000/25);
