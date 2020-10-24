const express = require('express')
const router = express.Router()
const Messages = require('../models/Messages')

// client requesting messages
router.get('/messages', (req, res) => {
  const recent = req.query.recent
  res.send(recent)
  res.status(200).end()
})

module.exports = router