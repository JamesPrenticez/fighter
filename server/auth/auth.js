const db = require("../database.js")

module.exports = {
  getpublicAddress,
  isUsernameTaken,
  createNewAccount
}

function getpublicAddress(data, cb){
	db.getpublicAddress({publicAddress: data.publicAddress})
    .then((res) => {
      if(res.username)
        cb({success: true, username: res.username})
      else
        cb(false)
  })
}

function isUsernameTaken(data, cb){
	db.getUsername({username: data.username})
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