const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getUsers,
  getUsernameAndPassword,
  getWallet,
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

function getWallet({wallet}, db = database) {
  return db("users").where({wallet}).first()
}

function getUsername({username}, db = database) {
  return db("users").where({username})
}

function createNewAccount({wallet, username}, db = database){
  return db("users").insert({wallet, username})
}

function updateProgress({id, progress}, db = database){
  if(!id) return Promise.reject("id must be correct")
  return db("users").where({id}).update({progress})
}

