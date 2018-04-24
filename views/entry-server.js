/* eslint prefer-promise-reject-errors: 0 */
import { createApp } from './main'
import conf from './config'

const isDev = process.env.NODE_ENV !== 'production'

let serverCookies
let route

export { serverCookies, route }
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()

    const { app, router, store } = createApp()
    const { url } = context
    const { fullPath, meta } = router.resolve(url).route

    route = router
    if (fullPath !== url) {
      return reject({ url: fullPath })
    }
    console.log(store.state)
    serverCookies = context.cookies
    if (meta.requiresAuth && !serverCookies.get(conf.storageNamespace + 'token')) {
      return reject({ code: 401 })
    } else {
      router.push(url)
    }
    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
