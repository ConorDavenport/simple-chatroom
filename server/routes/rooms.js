const express = require('express')
const router = express.Router()
const Room = require('../models/Rooms')

router.get('/', (req, res) => {
  res.send('testing HTTP Requests')
  console.log('get')
})

router.put('/', (req, res) => {
  const roomCode = req.body.roomCode
  const userName = req.body.userName
  console.log(`${roomCode}: ${userName}`)
  res.status(200).end()
})

module.exports = router