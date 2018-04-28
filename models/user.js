const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  role: {
    type: String,
    default: 'user'
  },
  username: String,
  password: String,
  email: String,
  nickname: String,
  motto: String,
  avatar: String,
  github: {
    type: Object,
    default: {
      id: String,
      username: String,
      token: String,
      email: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

schema.index({ username: 1 }, { unique: true })

module.exports = mongoose.model('User', schema)
