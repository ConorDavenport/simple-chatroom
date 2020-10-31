const express = require('express')
const router = express.Router()
const Messages = require('../models/Messages')

// client requesting older messages
// client sends the id of the least recent
// message they recieved and the server
// responds with the previous messages
router.get('/messages', (req, res) => {
  const leastRecent = req.query.leastRecent
  // client sends 0 if they don't have any messages
  if (leastRecent === '0') {
    Messages.find({}).sort({ _id: 'descending'}).limit(1)
    .then((docs) => {
      const data = JSON.stringify(docs[0])
      res.send(data)
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  } else {
    Messages.find({ _id: { $lt: leastRecent }})
      .sort({ _id: -1 }).limit(1)
    .then((docs) => {
      res.send(docs[0])
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  }
})

module.exports = router