import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import BasicLayout from '@/layout/BasicLayout.vue'

const routeIgnore = ['/login', '/404', '/403', '/500', '/userProfile', '/dashboard']
/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/systems',
    component: BasicLayout,
    redirect: '/servicesMonitor',
    meta: {
      title: '系统管理',
      icon: 'appstore-outlined'
    },
    children: [
      {
        path: '/users',
        redirect: '/users/list',
        meta: {
          title: '用户管理',
          icon: 'appstore-outlined'
        },
        children: [
          {
            path: '/users/list',
            component: () => import('@/views/system/user/UserList.vue'),
            meta: {
              title: '用户列表',
              icon: 'appstore-outlined'
            }
          },
          {
            path: '/users/create',
            component: () => import('@/views/system/user/UserCreate.vue'),
            meta: {
              title: '新增用户',
              icon: 'appstore-outlined'
            }
          },
          {
            path: '/users/detail',
            component: () => import('@/views/system/user/UserDetail.vue'),
            meta: {
              title: '用户详情',
              icon: 'appstore-outlined'
            }
          },
          {
            path: '/users/update',
            component: () => import('@/views/system/user/UserUpdate.vue'),
            meta: {
              title: '修改用户',
              icon: 'appstore-outlined'
            }
          }
        ]
      },
      {
        path: '/roles/list',
        component: () => import('@/views/system/role/RoleList.vue'),
        meta: {
          title: '角色列表',
          icon: 'appstore-outlined'
        }
      },
      {
        path: '/organizations/list',
        component: () => import('@/views/system/organization/OrganizationList.vue'),
        meta: {
          title: '部门列表',
          icon: 'appstore-outlined'
        }
      },
      {
        path: '/permissions/list',
        component: () => import('@/views/system/permission/PermissionList.vue'),
        meta: {
          title: '权限列表',
          icon: 'appstore-outlined'
        }
      },
      // {
      //   path: '/permissions',
      //   redirect: '/permissions/list',
      //   meta: {
      //     title: '权限管理',
      //     icon: 'appstore-outlined'
      //   },
      //   children: [
      //     {
      //       path: '/permissions/list',
      //       component: () => import('@/views/system/permission/PermissionList.vue'),
      //       meta: {
      //         title: '权限列表',
      //         icon: 'appstore-outlined'
      //       }
      //     }
      //   ]
      // },
      {
        path: '/servicesMonitor',
        component: () => import('@/views/system/service/ServiceMonitor.vue'),
        meta: {
          title: '服务监控',
          icon: 'appstore-outlined'
        }
      }
    ]
  }
]

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
          // 控制是否显示在部门栏中
          invisible: false
        }
      },
      {
        path: '/userProfile',
        name: 'userProfile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/system/user/UserProfile.vue'),
        meta: {
          title: '个人中心',
          // icon: 'dashboard-outlined',
          invisible: true
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
  routes: [...publicRoutes, ...privateRoutes]
})

router.beforeEach(async (to, from) => {
  NProgress.start()
})

router.afterEach((to) => {
  NProgress.done()
})

export default router
