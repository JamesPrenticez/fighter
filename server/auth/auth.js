const db = require("../database.js")

module.exports = {
  isValidPassword,
  isUsernameTaken,
  createNewAccount
}

function isValidPassword(data, cb){
	db.getUsernameAndPassword({username: data.username, password: data.password})
    .then((res) => {
      if(res.length > 0)
          cb(true);
      else
          cb(false);
    })
}

function isUsernameTaken(data, cb){
	db.getUsername({username: data.username})
    .then((res) => {
      if(res.length > 0)
          cb(true);
      else
          cb(false);
    })
}

function createNewAccount(data, cb){
  db.addUser({username: data.username, password: data.password})
  .then((res) => {
    cb()
  })
}