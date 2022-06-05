const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getUsers,
  getUsernameAndPassword,
  getPublicAddress,
  getUsername,
  createNewAccount,
  updateProgress
}

function getUsers(db = database) {
  return db("users").select("username")
}

function getUsernameAndPassword({username, password}, db = database) {
  return db("users").where({username, password})
}

function getPublicAddress({publicAddress}, db = database) {
  return db("users").where({publicAddress}).first()
}

function getUsername({username}, db = database) {
  return db("users").where({username})
}

function createNewAccount({publicAddress, username}, db = database){
  let nonce = Math.floor(Math.random() * 1000000)
  return db("users").insert({publicAddress, nonce, username})
}

function updateProgress({id, progress}, db = database){
  if(!id) return Promise.reject("id must be correct")
  return db("users").where({id}).update({progress})
}

