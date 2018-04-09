import fetch from '../util/fetch'

const createAPI = (url, method, config) => {
  config = config || {}
  return fetch({
    url,
    method,
    ...config
  })
}

const seemnite = {
  createArticle: config => createAPI('/article', 'post', config),
  updateArticle: (config, id) => createAPI(`/article/${id}`, 'post', config),
  deleteArticle: (config, id) => createAPI(`/article/${id}`, 'delete', config),
  articleDetail: (config, id) => createAPI(`/article/${id}`, 'get', config),
  articles: (config) => createAPI('/articles', 'get', config)
}

export {
  seemnite
}
