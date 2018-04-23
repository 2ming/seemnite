const config = require('config')

const { ArticleProxy } = require('../proxy')
const { Tag } = require('../models')

const defPageSize = config.get('pageSize')

module.exports = class ArticleController {
  /**
   * 创建文章
   * @param Object ctx
   */
  static async create(ctx) {
    let { body } = ctx.request
    if (body.tags && body.tags.length) {
      body.tags = await Promise.all(
        body.tags.map(async tag => {
          let value = await Tag.findOne({ name: tag })
          if (!value) {
            value = await Tag.create({ name: tag })
          }
          return value.id
        })
      )
    }

    await ArticleProxy.newAndSave(body)

    ctx.body = ctx.util.resuccess()
  }

  /**
   * 获取文章
   * @param Object ctx
   */
  static async get(ctx) {
    let { id } = ctx.params
    let details = await ArticleProxy.getById(id).populate({path: 'tags', select: 'name'})

    if (!details) {
      ctx.body = ctx.util.refail('文章查询失败')
      return
    }

    ctx.body = ctx.util.resuccess(details)
  }

  /**
   * 获取文章列表
   * @param Object ctx
   */
  static async list(ctx) {
    const pageIndex = ctx
      .checkQuery('page_index')
      .empty()
      .toInt()
      .gt(0)
      .default(1).value
    const pageSize = ctx
      .checkQuery('page_size')
      .empty()
      .toInt()
      .gt(0)
      .default(defPageSize).value

    if (ctx.errors) {
      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
      return
    }
    let total = await ArticleProxy.count()

    const opt = {
      select: 'title createdAt',
      skip: (pageIndex - 1) * pageSize,
      limit: pageSize,
      sort: '-created_at'
    }
    let articles = await ArticleProxy.find({}, opt)
    ctx.body = ctx.util.resuccess({
      list: articles,
      pageIndex,
      pageSize,
      total
    })
  }

  /**
   * 更新文章
   * @param Object ctx
   */
  static async update(ctx) {
    let { body } = ctx.request
    let { id } = ctx.params
    let article = await ArticleProxy.getById(id)

    if (!article) {
      ctx.body = ctx.util.refail('文章查询失败')
      return
    }

    if (body.tags && body.tags.length) {
      body.tags = await Promise.all(
        body.tags.map(async tag => {
          let value = await Tag.findOne({ name: tag })
          if (!value) {
            value = await Tag.create({ name: tag })
          }
          return value.id
        })
      )
    }

    article = await ArticleProxy.updateById(id, body)

    if (!article) {
      ctx.body = ctx.util.refail('文章更新失败')
      return
    }

    ctx.body = ctx.util.resuccess(article)
  }

  /**
   * 删除文章
   * @param Object ctx
   */
  static async delete(ctx) {
    let { id } = ctx.params
    let article = await ArticleProxy.removeById(id)

    if (!article) {
      ctx.body = ctx.util.refail('删除文章失败')
      return
    }
    ctx.body = ctx.util.resuccess()
  }
}
