import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";

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

const router:Router = createRouter({
    routes,
    history:createWebHistory()
})

export default router