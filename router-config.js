'use strict'

const config = require('config')
const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })


exports.api = apiRouter
  .all('*')
