export function drawPlayer(socket, ctx, framecount) {
  
  //recieve from the server
  socket.on("newPositions", function(data){
    ctx.clearRect(0,0,500,500)
    for(var i = 0; i < data.player.length; i++){
      ctx.fillStyle = 'black'
      ctx.fillText(data.player[i].number, data.player[i].x, data.player[i].y)
    }
    for(var i = 0; i < data.bullet.length; i++){
      ctx.fillStyle = data.bullet[i].color
      ctx.fillRect(data.bullet[i].x-5, data.bullet[i].y-5, 10,10)
    }
  })

}
