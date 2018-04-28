'use strict'

const _ = require('lodash')
const config = require('config')
const axios = require('axios')

const { User } = require('../models')
const jwt = require('jsonwebtoken')
const jwtSecret = config.get('jwt.secret')
const jwtExpire = config.get('jwt.expire')
const github = config.get('github')

const storageNamespace = config.get('fe.storageNamespace') + 'token'
module.exports = class GithubController {
  /**
   * github登录
   * @param Object ctx
   */

  static async login(ctx) {
    // 重定向到认证接口,并配置参数
    let path = `https://github.com/login/oauth/authorize?client_id=${github.client_id}&scope=${github.scope}&state=${(new Date()).valueOf()}`
    // 转发到授权服务器
    ctx.body = ctx.util.resuccess({path})
  }

  static async callback(ctx) {
    const { code } = ctx.query
    let path = 'https://github.com/login/oauth/access_token'
    const params = {
      client_id: github.client_id,
      client_secret: github.client_secret,
      code: code
    }
    let token = await axios(path, {
      method: 'POST',
      data: params
    }).then(res => {
      return res.data
    })
    let githubtoken = token.split('&')[0].split('=')[1]
    if (token) {
      const url = `https://api.github.com/user?${token}`
      let github = await axios.get(url)
        .then(res => {
          return res.data
        })
      if (github) {
        let githubUser = await User.findOne({username: github.name})
        let githubId = '' + github.id
        let isUser = await User.findOne({'github.id': githubId})
        if (!isUser && githubUser) {
          github.name = github.name + (new Date()).valueOf()
        }
        let user = await User.findOneAndUpdate({'github.id': githubId}, { $set:
          {
            username: isUser ? isUser.username : github.name,
            password: githubtoken,
            email: github.email,
            github: {
              id: githubId,
              username: github.name,
              token: githubtoken,
              email: github.email
            }
          }
        }, {new: true, upsert: true, setDefaultsOnInsert: true, passRawResult: true})
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpire })
        ctx.cookies.set(storageNamespace, token, {
          path: '/',
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 31
        })

        // ctx.body = ctx.util.resuccess(_.pick(user, fields))
        ctx.redirect('/index')
        return
      }

      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
    }
  }
}
