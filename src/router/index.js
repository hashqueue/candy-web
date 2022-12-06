import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import BasicLayout from '@/layout/BasicLayout.vue'
import { userStore } from '@/stores/user'
import { getUserPermissions } from '@/apis/permission'
import { generateRouteData } from '@/utils/common'

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
      }
      // {
      //   path: '/:pathMatch(.*)*',
      //   name: 'notFound',
      //   //   // 访问未在路由表中定义的路径则重定向到404页面
      //   redirect: '/404'
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes]
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar
  const userSettingStore = userStore()
  /* has token */
  if (userSettingStore.getToken !== '') {
    if (userSettingStore.getMenuPermissions.length === 0) {
      getUserPermissions().then((res) => {
        userSettingStore.setMenuPermissions(res.menu_permissions)
        userSettingStore.setButtonPermissions(res.api_permissions)
        // 动态添加可访问路由表
        for (const item of generateRouteData(res.menu_permissions)) {
          if (item.meta.parent !== null) {
            router.addRoute(item.meta.parent, item)
          } else {
            router.addRoute(item)
          }
        }
        router.addRoute('index', {
          path: '/:pathMatch(.*)*',
          name: 'notFound',
          // 访问未在路由表中定义的路径则重定向到404页面
          redirect: '/404'
        })
      })
    } else {
      // 动态添加可访问路由表
      for (const item of generateRouteData(userSettingStore.getMenuPermissions)) {
        if (item.meta.parent !== null) {
          router.addRoute(item.meta.parent, item)
        } else {
          router.addRoute(item)
        }
      }
    }
    if (to.matched.length === 0 && from.matched.length === 0) {
      // 刷新页面会白屏
      next(to)
    } else if (to.matched.length === 0 && from.matched.length !== 0) {
      // 未匹配到路由path跳转到404
      next({ path: '/404' })
    } else {
      next()
    }
  } else {
    if (routeWhiteList.includes(to.path)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
