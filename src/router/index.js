import { createRouter, createWebHashHistory } from "vue-router"

// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: "home",
        name: "home",
        component: () => import('@/views/Home.vue')
      },
      {
        path: "user",
        name: "user",
        component: () => import('@/views/User.vue')
      },
      {
        path: "mall",
        name: "mall",
        component: () => import('@/views/Mall.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router