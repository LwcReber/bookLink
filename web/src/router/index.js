import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '../views/main'),
    children: [
      {
        path: '',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "home" */ '../views/home')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '../views/search')
      },
      {
        path: '/banner/:id',
        name: 'banner',
        component: () => import(/* webpackChunkName: "banner" */ '../views/banner')
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/detail')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  {
    path: '/write',
    name: 'write',
    component: () => import(/* webpackChunkName: "write" */ '../views/write')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    next()
  }
})

export default router
