// import path from 'path'
// import os from 'os'
// import fs from 'fs'
// import formidable from 'formidable'
const { ArticleProxy } = require('../proxy')

module.exports = class ArticleController {
  /**
   * 创建文章
   * @param Object ctx
   */
  static async create(ctx) {
    let body = ctx.request.body

    await ArticleProxy.newAndSave(body)

    ctx.body = ctx.util.resuccess()
  }

  /**
   * 获取文章
   * @param Object ctx
   */
  static async get(ctx) {
    ctx.body = ''
  }

  /**
   * 获取文章列表
   * @param Object ctx
   */
  static async list(ctx) {
    ctx.body = ''
  }

  /**
   * 更新文章
   * @param Object ctx
   */
  static async update(ctx) {
    ctx.body = ''
  }

  /**
   * 删除文章
   * @param Object ctx
   */
  static async delete(ctx) {
    ctx.body = ''
  }
}
