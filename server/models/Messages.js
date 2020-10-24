const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Rooms', RoomSchema)