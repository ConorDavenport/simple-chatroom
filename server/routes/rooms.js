const express = require('express')
const router = express.Router()
const Room = require('../models/Rooms')

router.put('/request', (req, res) => {
  const roomCode = req.body.roomCode
  const userName = req.body.userName
  console.log(`${userName} Requested Room ${roomCode}`)

  if (!Room.exists({ code: roomCode })) {
    console.log(`Room ${roomCode} doesn't exist`)
    const room = new Room({ code: roomCode })
    room.save()
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  }
  else {
    res.status(200).end()  
  }
})

module.exports = router