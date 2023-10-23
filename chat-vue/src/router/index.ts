import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import { getUserInfo } from '../api/auth'
import userInfoStoreHook from '../store/modules/userInfo'
import { setToken } from '../utils/cookies'

const userInfoStore = userInfoStoreHook()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: async () => await import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: async () => await import('../views/login.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: async () => await import('../views/test.vue')
  }
]

const router: Router = createRouter({
  routes,
  history: createWebHistory()
})

const whiteList = ['login']

router.beforeEach((to, _from, next) => {
  if (whiteList.includes(to.name as string)) {
    next()
  } else {
    getUserInfo().then((res) => {
      userInfoStore.setUser(res.data.user)
      setToken('token', res.data.token as string)
      next()
    }).catch(() => {
      next()
    })
  }
})
router.afterEach(() => {
})
export default router
