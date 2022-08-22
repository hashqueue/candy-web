// import { defineStore } from 'pinia'
// import { publicRoutes, privateRoutes } from '@/router'
//
// export const permissionStore = defineStore({
//   id: 'permissionSetting',
//   state: () => ({
//     // 路由表：初始拥有静态路由权限
//     routes: publicRoutes
//   }),
//   getters: {
//     getRoutes: (state) => state.routes
//   },
//   actions: {
//     setRoutes(newRoutes) {
//       // 永远在静态路由的基础上增加新路由
//       this.routes = [...publicRoutes, ...newRoutes]
//     }
//   },
//   // 开启数据缓存
//   persist: {
//     key: 'permissionSetting',
//     storage: localStorage
//   }
// })
