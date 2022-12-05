import router from './router'
import { userStore } from '@/stores/user'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getUserPermissions } from '@/apis/permission'
import { generateRouteData } from '@/utils/common'

const routeWhiteList = ['/login', '/404', '/403', '/500', '/userProfile', '/dashboard']

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
