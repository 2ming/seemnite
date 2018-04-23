import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import layout from '../layouts/default.vue'
import admin from '../pages/admin.vue'
import about from '../pages/about.vue'
import details from '../pages/details.vue'
import login from '../pages/login.vue'
import logout from '../pages/logout.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/login', component: login },
      { path: '/logout', component: logout },
      {
        path: '/',
        redirect: 'index',
        component: layout,
        children: [
          { path: 'index', component: index },
          { path: 'details/:id', component: details },
          { path: 'about', component: about }
        ]
      },
      { path: '/admin', component: admin, meta: { requiresAuth: true } }
    ]
  })
}
