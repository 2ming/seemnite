'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  title: String,
  content: String,
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  flag: {
    type: Number,
    default: 1
  },
  like: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

schema.index({ created_at: -1 })

module.exports = mongoose.model('Article', schema)
