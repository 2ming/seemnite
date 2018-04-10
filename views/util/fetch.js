import axios from 'axios'
import conf from '../config'

const isClient = process.env.VUE_ENV === 'client'
const instance = axios.create({
  baseURL: isClient ? '/api' : `http://${conf.host}:${conf.port}/api`,
  timeout: conf.timeout
})

// request拦截器
instance.interceptors.request.use(config => {
  config.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate,max-age=-1,private'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code && res.data.code === '100') {
      return res
    }
    return res.data.data
  }
  ,
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default instance
