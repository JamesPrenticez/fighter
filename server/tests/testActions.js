const db = require("../database.js")
require("./auth.js")

export const testActions = () => {
  let testData = {username: "aasdfa", password: "superpassword"}

  auth.isUsernameTaken(testData,function(res){
    if(res){
      console.log("test: username already taken", )
    } else {
      db.addUser({username: testData.username, password: testData.password})
      .then(() => {
        console.log("test: new user created", testData.username )
      })
    }
  })
}

