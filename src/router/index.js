import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { userStore } from '@/stores/user'
import BasicLayout from '@/layout/BasicLayout.vue'

const routeWhiteList = ['/login', '/404', '/403', '/500', '/userProfile', '/dashboard']

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/UserLogin.vue')
  },
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/dashboard/DashboardView.vue'),
        meta: {
          title: '工作台',
          icon: 'dashboard-outlined',
          // 控制是否显示在菜单栏中
          is_visible: true
        }
      },
      {
        path: '/userProfile',
        name: 'userProfile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/system/user/UserProfile.vue'),
        meta: {
          title: '个人中心',
          // icon: 'dashboard-outlined',
          is_visible: false
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/Exc404View.vue')
      },
      {
        path: '/403',
        name: '403',
        component: () => import('@/views/error-page/Exc403View.vue')
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/error-page/Exc500View.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        // 访问未在路由表中定义的路径则重定向到404页面
        redirect: '/404'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userSettingStore = userStore()
  if (userSettingStore.getToken) {
    // console.log(to)
    // console.log(from)
    userSettingStore.setALlPermissions()
    next()
  } else {
    if (routeWhiteList.includes(to.path)) {
      next()
    }
  }
})

router.afterEach((to) => {
  NProgress.done()
})

export default router
