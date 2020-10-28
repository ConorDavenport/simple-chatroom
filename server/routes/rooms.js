const express = require('express')
const router = express.Router()
const Messages = require('../models/Messages')

// client requesting older messages
// client sends the id of the least recent
// message they recieved and the server
// responds with the previous messages
router.get('/messages', (req, res) => {
  const leastRecent = req.query.leastRecent
  if (leastRecent === '0') {
    Messages.find({}).sort({ _id: 'descending'})
    .then((docs) => {
      console.log(docs)
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    Messages.findById(leastRecent, (err, docs) => {
      console.log(docs)
      res.send(docs)
      res.status(200).end()
    })
  }
})

module.exports = router