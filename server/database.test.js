const environment = 'test'

const config = require('../knexfileTest')[environment]
const db = require('knex')(config)

const {getUsers} = require('./database.mjs')

beforeAll(() => database.migrate.latest())
beforeEach(() => database.seed.run())

// export function getUsers() {
//   return database("users").select("username")
// }

test("Get all users", () => {
  getUsers(db)
  .then((users) => {
    expect(users.length).toBe(3)
  })
})


// export function getUsernameAndPassword({username, password}) {
//   return database("users").where({username, password})
// }

// export function getUsername({username}) {
//   return database("users").where({username})
// }

// export function addUser({username, password}){
//   console.log("adduser", username, password)
//   return database("users").insert({username, password})
// }

// export function updateProgress({id, progress}){
//   if(!id) return Promise.reject("id must be correct")
//   return database("users").where({id}).update({progress})
// }

