import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import {getUserInfo} from "../api/auth";
import userInfoStoreHook from "../store/modules/userInfo";
import {setToken} from "../utils/cookies";

const userInfoStore = userInfoStoreHook()

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/index",
    },
    {
        path: '/index',
        name: 'index',
        component: () => import("../views/index.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/login.vue")
    },
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
        getUserInfo().then((res: any) => {
            userInfoStore.setUser(res.data.user)
            setToken('token', res.data.token as string)
            next()
        }).catch(() => {
            next()
        })
    }
})
export default router