const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    default: ''
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

schema.index({ updated_at: -1 })

module.exports = mongoose.model('Tag', schema)
