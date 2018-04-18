'use strict'

const _ = require('lodash')
const config = require('config')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const util = require('../util')

const jwtSecret = config.get('jwt.secret')
const jwtExpire = config.get('jwt.expire')
const fields = ['username', '_id', 'token']

module.exports = class UserController {
  /**
   * 用户注册
   * @param Object ctx
   */

  static async register(ctx) {
    const username = ctx.checkBody('name').notEmpty().len(4, 20).value
    const password = ctx.checkBody('password').notEmpty().len(6, 20).value

    if (ctx.errors) {
      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
    }

    let user = await User.findOne({username})

    if (user) {
      ctx.body = ctx.util.refail('用户已存在')
      return
    }
    const newPassword = util.bhash(password)

    user = await User.create({username, password: newPassword})

    user.token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpire })

    ctx.body = ctx.util.resuccess(_.pick(user, fields))
  }

  /**
   * 用户登录
   * @param Object ctx
   */

  static async login(ctx) {
    const username = ctx.checkBody('name').notEmpty().value
    const password = ctx.checkBody('password').notEmpty().value

    if (ctx.errors) {
      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
      return
    }

    const user = await User.findOne({username})

    if (!user) {
      ctx.body = ctx.util.refail('用户不存在')
      return
    }

    const verifyPassword = util.bcompare(password, user.password)

    if (!verifyPassword) {
      ctx.body = ctx.util.refail('用户名或密码错误')
      return
    }

    user.token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpire })

    ctx.body = ctx.util.resuccess(_.pick(user, fields))
  }

  /**
   * 用户登出
   * @param Object ctx
   */

  static async logout(ctx) {

  }

  /**
   * 更新用户信息
   * @param Object ctx
   */

  static async update(ctx) {

  }

  /**
   * 获取用户列表
   * @param Object ctx
   */

  static async list(ctx) {

  }

  /**
   * 获取用户信息
   * @param Object ctx
   */

  static async get(ctx) {

  }
}
