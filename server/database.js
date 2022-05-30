const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getUsers,
  getUsernameAndPassword,
  getUsername,
  addUser,
  updateProgress
}

function getUsers(db = database) {
  return db("users").select("username")
}

function getUsernameAndPassword({username, password}, db = database) {
  return db("users").where({username, password})
}

function getUsername({username}, db = database) {
  return db("users").where({username})
}

function addUser({username, password}, db = database){
  console.log("adduser", username, password)
  return db("users").insert({username, password})
}

function updateProgress({id, progress}, db = database){
  if(!id) return Promise.reject("id must be correct")
  return db("users").where({id}).update({progress})
}

