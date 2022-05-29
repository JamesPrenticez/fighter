let canvasX = 500
let canvasY = 500

import Bullet from './bullets.js'

// ---------- PLayer ---------- 
export default class Player{
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
          let angle = Math.atan2(
              this.clientY - this.y,
              this.clientX - this.x
          ) / Math.PI * 180

          let bullet = new Bullet(this.x, this.y, this.id, angle)
          Bullet.list[bullet.id] = bullet

          this.cooldown = true;
          setTimeout(() => this.cooldown = false, 300);
      }
  }
}

Player.list = {}

Player.onConnect = (socket) => {
    let numberOfPlayers =  Object.keys(Player.list).length + 1
    let player = new Player(socket.id, numberOfPlayers)
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

Player.onDisconnect = (socket, SOCKET_LIST) => {
    console.log("Socket disconnected " + socket.id)
    delete Player.list[socket.id]
    console.log("There are " + Object.keys(Player.list).length + " players online")
}

Player.update = () => {
    let pack = [];
    for(let i in Player.list){
        let player = Player.list[i]
        player.update()
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number
        })
    }
    return pack;
}
