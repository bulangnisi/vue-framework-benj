import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/draw'
  },
  {
    path: '/draw',
    component: () => import('@/views/draw.vue'),
    meta: { inxde: 1 }
  },
  {
    path: '/page1',
    component: () => import('@/views/page1.vue'),
    meta: { index: 2 }
  },
  {
    path: '/page2',
    component: () => import('@/views/page2.vue'),
    meta: { index: 3 }
  }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
