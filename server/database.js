const environment = process.env.NODE_ENV || 'development'

import knex from 'knex'
import config from '../knexfile.js'
const database = knex(config[environment])

export function getUsers() {
  return database("users").select("username")
}

export function getUsernameAndPassword({username, password}) {
  return database("users").where({username, password})
}

export function getUsername({username}) {
  return database("users").where({username})
}

export function addUser({username, password}){
  return database("users").insert({username, password})
}

export function updateProgress({id, progress}){
  if(!id) return Promise.reject("id must be correct")
  return database("users").where({id}).update({progress})
}

