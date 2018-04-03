import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('../pages/index.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/index', component: index },
      { path: '/', redirect: '/index' }
    ]
  })
}
