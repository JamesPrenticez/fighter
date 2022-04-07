const express = require('express')
const db = require('../database')
const router = express.Router()

module.exports = router

router.get('/api/users', (req, res) => {
  db.getUsers(res).then(x => res.send(x))
    //.then(callback => res.json({users: callback}))
    //.catch(err => {
    //    res.status(500).send('something went wrong')
  //})
})