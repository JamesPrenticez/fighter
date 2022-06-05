const db = require("../database.js")

module.exports = {
  getPublicAddress,
  isUsernameTaken,
  createNewAccount
}

function getPublicAddress(data, cb){
	db.getPublicAddress({publicAddress: data.publicAddress})
    .then((res) => {
      if(res != undefined)
        cb({success: true, publicAddress: res.publicAddress, username: res.username, nonce: res.nonce})
      else
        cb({success: false})
  })
}

function isUsernameTaken(data, cb){
	db.getUsername({username: data.username.toLowerCase()})
    .then((res) => {
      if(res.length > 0)
        cb(true)
      else
        cb(false)
  })
}

function createNewAccount(data, cb){
  db.createNewAccount({
    publicAddress: data.publicAddress,
    username: data.username
  })
  .then((res) => {
    cb()
  })
}