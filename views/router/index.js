import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('../pages/index.vue')
const layout = () => import('../layouts/default.vue')
const admin = () => import('../pages/admin.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        component: layout,
        children: [
          { path: 'index', component: index },
          { path: 'admin', component: admin }
        ]
      }
    ]
  })
}
