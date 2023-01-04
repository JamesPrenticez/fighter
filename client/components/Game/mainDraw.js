export function mainDraw(socket, ctx, framecount) {
  
  //recieve from the server
  socket.on("newPositions", function(data){

    // Clear Canvas
    ctx.clearRect(0,0,500,500)

    // Draw Players
    for(var i = 0; i < data.player.length; i++){
      ctx.fillStyle = 'black'
      ctx.fillRect(data.player[i].x - 10, data.player[i].y - 10, 20, 20)
      ctx.fillStyle = 'red'
      ctx.fillText(data.player[i].number, data.player[i].x, data.player[i].y)
    }

    // Draw Bullets
    for(var i = 0; i < data.bullet.length; i++){
      ctx.fillStyle = data.bullet[i].color
      ctx.fillRect(data.bullet[i].x-5, data.bullet[i].y-5, 10,10)
    }
  })

}
