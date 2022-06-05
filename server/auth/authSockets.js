const { isUsernameTaken, createNewAccount, getpublicAddress } = require("./auth.js")

function listen(io){
  io.on("connect", (socket) => {
    socket.on("createNewAccount", (data) => {
      isUsernameTaken(data, function(res){
          if(res){
            socket.emit('createNewAccountResponse', {success: false})		
          } else {
            createNewAccount(data, function(){
                socket.emit('createNewAccountResponse', {success: true})				
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
    socket.on("publicAddress", (data) => {
      getpublicAddress(data, function(res){
        console.log("get public address", res)
          if(res){
              socket.emit('getPublicAddressResponse', {success: true, username: res.username})		
            } else {
              socket.emit('getPublicAddressResponse', {success: false})				
          }
      })		
    })
  })
}

module.exports = {
  listen,
}