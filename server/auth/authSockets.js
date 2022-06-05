const { isUsernameTaken, createNewAccount, getPublicAddress } = require("./auth.js")

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
    socket.on("getPublicAddress", (data) => {
      getPublicAddress(data, function(res){
          if(res){
              socket.emit('publicAddressResponse', {success: true, username: res.username, nonce: res.nonce})		
            } else {
              socket.emit('publicAddressResponse', {success: false})				
          }
      })		
    })
  })
}

module.exports = {
  listen,
}