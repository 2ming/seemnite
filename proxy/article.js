'use strict'

const { Article } = require('../models')

module.exports = class GroupProxy {
  static async newAndSave(docs) {
    const article = new Article(docs)

    return article.save()
  }
  static async count(query) {
    return Article.count()
  }

  static getById(id) {
    return Article.findById(id)
  }

  static findOne(query) {
    return Article.findOne(query)
  }

  static find(query, opt) {
    return Article.find(query, {}, opt)
  }

  static updateById(id, doc) {
    return Article.update({ _id: id }, { $set: doc })
  }

  static removeById(id) {
    return Article.findByIdAndRemove(id)
  }
}
