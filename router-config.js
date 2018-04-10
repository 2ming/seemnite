'use strict'

const config = require('config')
const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

const {
  article
} = require('./controllers')

exports.api = apiRouter
  .get('/articles', article.list)
  .get('/article/:id?', article.get)
  .post('/article', article.create)
  .post('/article/:id?', article.update)
  .del('/article/:id?', article.delete)
