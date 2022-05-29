import * as db from "../database.js"

export const isValidPassword = (data,cb) => {
	db.getUsernameAndPassword({username: data.username, password: data.password})
    .then((res) => {
      if(res.length > 0)
          cb(true);
      else
          cb(false);
    })
}

export const isUsernameTaken = (data,cb) => {
	db.getUsername({username: data.username})
    .then((res) => {
      if(res.length > 0)
          cb(true);
      else
          cb(false);
    })
}

export const addUser = (data, cb) => {
  db.addUser({username: data.username, password: data.password})
  .then((res) => {
    cb()
  })
}