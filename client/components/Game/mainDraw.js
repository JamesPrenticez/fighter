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
      ctx.fillStyle = 'black'
      ctx.fillRect(data.player[i].x - 10, data.player[i].y - 10, 20, 20)

    }

    // Draw Bullets
    // for(var i = 0; i < data.bullet.length; i++){
    //   ctx.fillStyle = data.bullet[i].color
    //   ctx.fillRect(data.bullet[i].x-5, data.bullet[i].y-5, 10,10)
    // }
  })

}
