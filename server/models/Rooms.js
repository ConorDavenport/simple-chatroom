const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  users: [{
    id: { type: Number },
    name: { type: String }
  }]
})

module.exports = mongoose.model('Rooms', RoomSchema)