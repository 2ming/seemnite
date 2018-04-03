'use strict'

const Koa = require('koa')
const path = require('path')
const config = require('config')
const staticCache = require('koa-static-cache')
const routerConfig = require('./router-config')

const app = module.exports =  new Koa()
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

app
  .use(serve('/dist', './dist'))
  .use(serve('/public', './public'))
  .use(routerConfig.api.routes())
  .use(routerConfig.api.allowedMethods())

app.proxy = config.get('proxy')

/* istanbul ignore if */
if (!module.parent) {
  const port = config.get('port')
  const host = config.get('host')
  app.use(require('./middlewares/view').render(app))
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

