'use strict'

const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise
mongoose.connect(config.get('db'), {
  poolSize: 20
}, (err) => {
  /* istanbul ignore if */
  if (err) {
    console.error('connect to %s error: ', config.get('db'), err.message)
    process.exit(1)
  }
})

module.exports = {
  Article: require('./article'),
  Tag: require('./tag'),
  User: require('./user')
}
