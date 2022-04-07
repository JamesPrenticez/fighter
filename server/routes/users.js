const express = require("express")
const db = require("../database")
const router = express.Router()

module.exports = router

router.get("/api/users", (req, res) => {
  db.getUsers()
    .then(callback => res.status(200).json({users: callback}))
    .catch(err => {
       res.status(500).send(err)
  })
})  

router.post("/api/user", (req, res) => {
  let {username, password, email} = req.body
  db.addUser({username, password, email})
    .then((ids) => {
      res.status(201).json({id: ids[0]})
    })
    .catch(err => {
      res.status(500).send(err)
  })
})

router.patch("/api/user/:id", (req, res) => {
  let {progress} = req.body
  db.updateProgress(id, progress)
    .then(() => {
      res.status(201)
    })
    .catch(err => {
      res.status(500).send(err)
  })
})