const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateProgress,
}

function getUsers() {
  return database("users").select("username")
}

function getUser({username, password}) {
  if(!database("users").where({username, password})) return
  return true

}

function addUser({username, password, email}){
  return database("users").insert({username, password, email})
}

function updateProgress({id, progress}){
  if(!id) return Promise.reject("id must be correct")
  return database("users").where({id}).update({progress})
}

