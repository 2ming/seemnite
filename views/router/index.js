import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('../pages/index.vue')
const layout = () => import('../layouts/default.vue')
const admin = () => import('../pages/admin.vue')
const about = () => import('../pages/about.vue')
const details = () => import('../pages/details.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        redirect: 'index',
        component: layout,
        children: [
          { path: 'index', component: index },
          { path: 'details/:id', component: details },
          { path: 'admin', component: admin },
          { path: 'about', component: about }
        ]
      }
    ]
  })
}
