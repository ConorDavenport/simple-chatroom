const express = require('express')
const router = express.Router()
const Room = require('../models/Rooms')
const User = require('../models/Users')

router.get('/', (req, res) => {
  res.send('testing HTTP Requests')
  console.log('get')
})

router.put('/', (req, res) => {
  const roomCode = req.body.roomCode
  const userName = req.body.userName
  var id
  const user = new User({
    name: userName
  })
  user.save()
  .then((data) => {
    id = data._id
    console.log(`${userName}:${id} is joining room ${roomCode}`)
    res.status(200).end()
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router