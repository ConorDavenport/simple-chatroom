const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'User'
  }
})

module.exports = mongoose.model('Users', UserSchema)