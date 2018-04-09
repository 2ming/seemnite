'use strict'

const { Article } = require('../models')

module.exports = class GroupProxy {
  static async newAndSave(docs) {
    const article = new Article(docs)

    return article.save()
  }

  static findByName(name) {
    return Article.findOne({ name })
  }

  static findOne(query) {
    return Article.findOne(query)
  }

  static find(query) {
    return Article.find(query, {})
  }

  static updateById(id, doc) {
    return Article.update({ _id: id }, { $set: doc })
  }

  static del(query) {
    return Article.remove(query)
  }
}
