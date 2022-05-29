let canvas = document.getElementById("canvas");
let playerListButton = document.getElementById("player-list");
let ctx = canvas.getContext("2d");
let x = document.getElementById("clientX");
let y = document.getElementById("clientY");
let active = false
ctx.font = "50px Arial"

let playerList = {}

class Player{
  constructor(){
      this.id = initPack.id,
      this.x = initPack.x,
      this.y = initPack.y,
      this.r = initPack.r,
      this.number = number
      Player.list[this.id] = this.id
  }
}

Player.list = {}

class Bullet{
  constructor(){
      this.id = initPack.id,
      this.x = initPack.x,
      this.y = initPack.y,
      this.number = number
      Bullet.list[this.id] = this.id
  }
}

Bullet.list = {}

playerListButton.onclick = () =>{
  console.log('Player.list', Player.list)
}
//init

//update

//remove

//recieve from the server
socket.on("newPositions", function(data){
    ctx.clearRect(0,0,500,500)
    for(var i = 0; i < data.player.length; i++){
      ctx.beginPath();
      ctx.fillStyle = 'green'
      ctx.strokeStyle = 'green'
      ctx.arc(data.player[i].x, data.player[i].y, 25, 0, 2 * Math.PI);
      ctx.stroke()
      ctx.fill()
      //ctx.fillRect(data.player[i].x-25, data.player[i].y-25, 50, 50)
      ctx.fillStyle = "red";
      ctx.fillText(data.player[i].number, data.player[i].x-15, data.player[i].y+15)
    }
    for(var i = 0; i < data.bullet.length; i++){
      ctx.fillStyle = data.bullet[i].color
      ctx.fillRect(data.bullet[i].x-5, data.bullet[i].y-5, 10, 10)
    }
})

//send to the server
canvas.onmouseenter = () => {
  active = true
  canvas.style.borderColor = "green"
}

canvas.onmouseleave = () => {
  active = false
  canvas.style.borderColor = "red"
}

document.onkeydown = (event) => {
  if(!active) return
  if (event.keyCode === 87) socket.emit("keyPress", {inputId:"up", state: true}); // w
  else if (event.keyCode === 83) socket.emit("keyPress", {inputId:"down", state: true}); // s
  else if (event.keyCode === 68) socket.emit("keyPress", {inputId:"right", state: true}); // d
  else if (event.keyCode === 65) socket.emit("keyPress", {inputId:"left", state: true}); // a
}

document.onkeyup = (event) => {
  if(!active) return
  if (event.keyCode === 87) socket.emit("keyPress", {inputId:"up", state: false}); // w
  else if (event.keyCode === 83) socket.emit("keyPress", {inputId:"down", state: false}); // s
  else if (event.keyCode === 68) socket.emit("keyPress", {inputId:"right", state: false}); // d
  else if (event.keyCode === 65) socket.emit("keyPress", {inputId:"left", state: false}); // a
}

canvas.onmousedown = (event) => {
  if(!active) return
  if (event.button === 0) socket.emit("keyPress", {inputId:"attack", state: true}) //left click
  else if (event.button === 1) console.log("middle button")
  else if (event.button === 2) socket.emit("right click") 
}

canvas.onmouseup = (event) => {
  if(!active) return
  if (event.button === 0) socket.emit("keyPress", {inputId:"attack", state: false}) //left click
}

canvas.onmousemove = (event) => {
  if(!active) return

  let screenLocation = canvas.getBoundingClientRect();

  x.innerText  = "x: " + (event.clientX - screenLocation.x);
  y.innerText  = "y: " + (event.clientY - screenLocation.y);

  socket.emit("keyPress", {inputId:"clientX", state: (event.clientX - screenLocation.x)})
  socket.emit("keyPress", {inputId:"clientY", state: (event.clientY - screenLocation.y)})
}