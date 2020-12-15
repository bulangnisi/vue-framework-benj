import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/page1'
  },
  {
    path: '/page1',
    component: () => import('@/views/page1.vue'),
    meta: { index: 1 }
  },
  {
    path: '/page2',
    component: () => import('@/views/page2.vue'),
    meta: { index: 2 }
  }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
