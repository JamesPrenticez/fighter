const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getUsers,
  getUsernameAndPassword,
  getUsername,
  addUser,
  updateProgress,
}

function getUsers() {
  return database("users").select("username")
}

function getUsernameAndPassword({username, password}) {
  return database("users").where({username, password})
}

function getUsername({username}) {
  return database("users").where({username})
}

function addUser({username, password}){
  return database("users").insert({username, password})
}

function updateProgress({id, progress}){
  if(!id) return Promise.reject("id must be correct")
  return database("users").where({id}).update({progress})
}

