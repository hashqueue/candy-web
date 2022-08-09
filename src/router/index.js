import { createRouter, createWebHashHistory } from 'vue-router'
import basicLayout from '@/layout/BasicLayout.vue'

const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/UserLogin.vue')
  },
  {
    path: '/',
    name: 'home',
    component: basicLayout,
    redirect: '/login',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/dashboard/DashboardView.vue'),
        meta: {
          title: '工作台',
          icon: 'dashboard',
          invisible: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
