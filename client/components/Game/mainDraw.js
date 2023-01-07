let canvasWidth = 500
let canvasHeight = 500

export function mainDraw(socket, ctx, framecount) {
  
  //recieve from the server
  socket.on("newPositions", function(data){
    // Clear Canvas
    ctx.clearRect(0 , 0, canvasWidth, canvasHeight)

    // Frame Rate
    ctx.font = "20px Arial";
    ctx.fillStyle = 'red'
    ctx.fillText(framecount, 10, 50);


    // Draw Players
    for(var i = 0; i < data.player.length; i++){

      // XY
      let position = data.player[i].x + "," + data.player[i].y
      ctx.fillText(position, 50, 50);

      // Body
      ctx.fillStyle = 'red'
      ctx.fillRect(data.player[i].x, data.player[i].y, 64, 64)

      // Username
      ctx.font = "12px Arial";
      ctx.fillStyle = 'black'
      ctx.fillText(data.player[i].username, data.player[i].x, data.player[i].y + 10)

      // Animate Player Sprite
      if (playerFrameX < 9) playerFrameX ++
      else playerFrameX = 0

      // Player Sprite
      drawPlayerSprite(
        ctx,
        images.player, //img
        data.player[i], //playerData
        playerWidth, //sW
        playerHeight, //sH
        data.player[i].x, //dX 
        data.player[i].y, //dY
        playerWidth, //dW
        playerHeight //dH
      )

    }

    // Draw Bullets
    // for(var i = 0; i < data.bullet.length; i++){
    //   ctx.fillStyle = data.bullet[i].color
    //   ctx.fillRect(data.bullet[i].x-5, data.bullet[i].y-5, 10,10)
    // }
  })

}

// Draw Player Sprite
const images = {}
images.player = new Image()
images.player.src = './assets/BODY_skeleton.png'

const playerWidth = 64
const playerHeight = 64
let playerFrameX = 0
let playerFrameY = 3
const playerSpeed = 6

function drawPlayerSprite(ctx, img, playerData, sW, sH, dX, dY, dW, dH){
  let direction = determinePlayerAction(playerData)

  let sX = playerWidth * direction.playerFrameX
  let sY = playerHeight * direction.playerFrameY

  ctx.drawImage(
    img,
    sX,
    sY,
    sW,
    sH,
    dX,
    dY,
    dW,
    dH
  )
}

let lastFacing = {
  key: 'down',
  playerFrameX: 0,
  playerFrameY: 3
}

function determinePlayerAction(playerData){
  if(!playerData) return

  const {pressingUp, pressingLeft, pressingDown, pressingRight} = playerData

  if(pressingUp) {
    lastFacing = {
      key: 'up',
      playerFrameX: 0,
      playerFrameY: 0
    }
    return {key:'up', playerFrameX: 0, playerFrameY: 0}
  }
  else if(pressingLeft){
    lastFacing = {
      key: 'left',
      playerFrameX: 0,
      playerFrameY: 1
    }
    return {key:'left', playerFrameX: 0, playerFrameY: 1}
  }
  else if(pressingRight){
    lastFacing = {
      key: 'right',
      playerFrameX: 0,
      playerFrameY: 3
    }
    return {key:'right', playerFrameX: 0, playerFrameY: 3}
  }
  else if(pressingDown){
    lastFacing = {
      key: 'down',
      playerFrameX: 0,
      playerFrameY: 2
    }
    return {key:'down', playerFrameX: 0, playerFrameY: 2}
  } else return {key: lastFacing.key, playerFrameX: lastFacing.playerFrameX, playerFrameY: lastFacing.playerFrameY}
}
