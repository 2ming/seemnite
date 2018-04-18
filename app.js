'use strict'

const Koa = require('koa')
const path = require('path')
const validate = require('koa-validate')
const koaBody = require('koa-body')
const config = require('config')
const koaJwt = require('koa-jwt')
const pathToRegexp = require('path-to-regexp')
const staticCache = require('koa-static-cache')
const routerConfig = require('./router-config')
const Router = require('koa-router')
const middleware = require('./middlewares')

const app = module.exports =  new Koa()
const router = new  Router()
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const jwtSecret = config.get('jwt.secret')

validate(app)

app
  .use(serve('/dist', './dist'))
  .use(serve('/public', './public'))
  .use(middleware.util)
  .use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
  .use(koaJwt({ secret: jwtSecret }).unless((ctx) => {
    if (/^\/api/.test(ctx.path)) {
      return pathToRegexp([
        '/api/articles',
        '/api/articles/:id',
        '/api/login',
        '/api/register'
      ]).test(ctx.path)
    }
    return true
  }))
  .use(koaBody({ multipart: true }))
  .use(routerConfig.api.routes())
  .use(routerConfig.api.allowedMethods())

app.proxy = config.get('proxy')

/* istanbul ignore if */
if (!module.parent) {
  const port = config.get('port')
  const host = config.get('host')
  router.get('*', require('./middlewares/view').render(app))
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(port, host)
  console.log(`server started at http://${host}:${port}`)
}


function serve (prefix, filePath) {
  return staticCache(path.resolve(__dirname, filePath), {
    prefix: prefix,
    gzip: true,
    dynamic: true,
    maxAge: 60 * 60 * 24 * 30
  })
}

