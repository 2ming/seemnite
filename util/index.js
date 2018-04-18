'use strict'

const _ = require('lodash')
const path = require('path')
const config = require('config')
const bcrypt = require('bcryptjs')
const pathToRegexp = require('path-to-regexp')

module.exports = class BaseUtil {
  /**
   * 加密字符串
   * @param String str
   */

  static bhash(str) {
    return bcrypt.hashSync(str, 8)
  }

  /**
   * 对比原字符串与经过加密的字符串是否相同
   * @param String str
   * @param String hash
   */

  static bcompare(str, hash) {
    return bcrypt.compareSync(str, hash)
  }

  /**
   * 安全的 decodeURIComponent
   * @param String str
   */

  static safeDecodeURIComponent(str) {
    try {
      return decodeURIComponent(str)
    } catch (e) {
      return str
    }
  }

  /**
   * 解析出 params 对象
   *
   * /user/nick (/user/:name) => { name: 'nick' }
   *
   * @param String restURL /user/:name
   * @param String fullURL /user/nick
   */

  static params(restURL, fullURL) {
    const params = {}
    const paramNames = []
    const api = pathToRegexp(restURL, paramNames)
    const captures = fullURL.match(api)

    if (!captures) return {}

    captures.slice(1).forEach((value, i) => {
      /* istanbul ignore else */
      if (paramNames[i]) {
        params[paramNames[i].name] = this.safeDecodeURIComponent(value)
      }
    })

    return params
  }
}
