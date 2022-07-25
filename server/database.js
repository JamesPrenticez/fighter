



const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const database = require('knex')(config)

module.exports = {
  getUsers,
  getUsernameAndPassword,
  getPublicAddress,
  getUsername,
  createNewAccount,
  createNewCharacter,
  updateProgress
}

function getUsers(db = database) {
  return db("users").select("username")
}

function getUsernameAndPassword({username, password}, db = database) {
  return db("users").where({username, password})
}

function getPublicAddress({publicAddress}, db = database){
    let response = db("users").where({publicAddress}).first()
    return response
  }

function getUsername({username}, db = database) {
  return db("users").where({username})
}

function createNewAccount({publicAddress, username}, db = database){
  let nonce = Math.floor(Math.random() * 1000000)
  let emptySlots = JSON.stringify([{slot: 0}, {slot: 1}, {slot: 2}])
  return db("users").insert({publicAddress, nonce, username: username.toLowerCase(), characters: emptySlots})
}

function createNewCharacter({publicAddress, slot, seed}, db = database){
  let userObj = db("users").where({publicAddress}).first()
  let characters = JSON.parse(userObj.characters)

  characters[slot] = {
    slot: slot,
    seed: seed,
    stats: {
      level: 1,
      hp: 10,
      attack: 1,
      strength: 1,
      defence: 1,
      speed: 1
    } 
  }

  let updatedCharacters = JSON.stringify(characters)

  return db("users").where({publicAddress}).insert({characters: updatedCharacters})
}

function updateProgress({id, progress}, db = database){
  if(!id) return Promise.reject("id must be correct")
  return db("users").where({id}).update({progress})
}

