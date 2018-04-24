import Message from '../components/message'
import axios from 'axios'
import conf from '../config'

import Cookies from 'universal-cookie'
import { serverCookies, route } from '../entry-server'

const cookies = new Cookies()
const isClient = process.env.VUE_ENV === 'client'
const instance = axios.create({
  baseURL: isClient ? '/api' : `http://${conf.host}:${conf.port}/api`,
  timeout: conf.timeout
})

instance.interceptors.request.use((config) => {
  let token
  if (isClient) {
    token = cookies.get(conf.storageNamespace + 'token')
  } else {
    token = serverCookies.get(conf.storageNamespace + 'token')
  }
  config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

instance.interceptors.response.use((res) => {
  const messageUnless = res.config.messageUnless || []
  const body = res.data

  if (body.success === false) {
    if (body.code === 10001) {
      body.data.forEach((date) => {
      })
    } else if (messageUnless.indexOf(body.message) === -1) {
      Message({
        type: 'warning',
        message: body.message
      })
    }
    return Promise.reject(res)
  }
  return body
}, (error) => {
  const res = error.response
  if (res) {
    if (res.status === 401 && /authentication/i.test(res.data.error)) {
      if (isClient) {
        Message({
          type: 'warning',
          message: '请重新登录'
        })
        route.push('/log-out')
      } else {
        return Promise.reject({ code: 401 }) // eslint-disable-line
      }
    } else if (isClient && res.data && res.data.error) {
      Message({
        type: 'warning',
        message: res.data.error
      })
    }
  }
  Promise.reject(error)
})

export default instance
