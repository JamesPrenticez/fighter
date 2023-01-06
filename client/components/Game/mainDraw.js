

export function mainDraw(socket, ctx, framecount) {
  
  //recieve from the server
  socket.on("newPositions", function(data){
    // Clear Canvas
    ctx.clearRect(0,0,500,500)

    // Frame Rate
    ctx.font = "20px Arial";
    ctx.fillStyle = 'red'
    ctx.fillText(framecount, 10, 50);


    // Draw Players
    for(var i = 0; i < data.player.length; i++){

      // Username
      ctx.font = "12px Arial";
      ctx.fillStyle = 'black'
      ctx.fillText(data.player[i].username, data.player[i].x, data.player[i].y)

      // XY
      let position = data.player[i].x + "," + data.player[i].y
      ctx.fillText(position, 50, 50);

      // Body
      // ctx.fillStyle = 'black'
      // ctx.fillRect(data.player[i].x - 10, data.player[i].y - 10, 20, 20)

      // Player Sprite
      drawPlayerSprite(
        ctx,
        images.player, //img
        playerWidth * playerFrameX, //sX
        playerHeight * playerFrameY, //sY
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

const playerWidth = '64'
const playerHeight = '64'
let playerFrameX = 0
let playerFrameY = 1
const playerSpeed = 6

function drawPlayerSprite(ctx, img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}