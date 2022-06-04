const { isUsernameTaken } = require("./auth.js")

function listen(io){
  io.on("connect", (socket) => {
    socket.on("register", (data) => {
      isUsernameTaken(data, function(res){
          if(res){
              socket.emit('registrationResponse', {success: false})		
          } else {
              auth.addUser(data,function(){
                  socket.emit('registrationResponse', {success: true})				
              })
          }
      })		
    })
    socket.on("isUsernameTaken", (data) => {
      isUsernameTaken(data, function(res){
          if(res){
              socket.emit('isUsernameTakenResponse', {success: true})		
            } else {
              socket.emit('isUsernameTakenResponse', {success: false})				
          }
      })		
    })
  })
}

module.exports = {
  listen,
}