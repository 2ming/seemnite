'use strict'

const config = require('config')
const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

const {
  user,
  article,
  util
} = require('./controllers')

exports.api = apiRouter
  .post('/register', user.register)
  .post('/login', user.login)
  .get('/logout', user.logout)
  .post('/user/:id?', user.update)
  .get('/user/:id?', user.get)
  .get('/user', user.list)

  .get('/articles', article.list)
  .get('/articles/:id?', article.get)
  .post('/article', article.create)
  .post('/article/:id?', article.update)
  .del('/article/:id?', article.delete)

  .get('/wallpaper', util.wallpaper)
