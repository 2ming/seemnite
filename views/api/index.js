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
const user = {
  login: (config) => createAPI('/login', 'post', config),
  logout: (config) => createAPI('/logout', 'get', config),
  list: (config) => createAPI('/user', 'get', config),
  register: (config) => createAPI('/register', 'post', config),
  update: (config, id) => createAPI(`/user/${id}`, 'post', config),
  getUser: (config, id) => createAPI(`/user/${id}`, 'get', config)
}

export {
  seemnite,
  user
}
