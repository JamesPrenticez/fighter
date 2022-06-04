const db = require("../database.js")

module.exports = {
  isUsernameTaken,
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