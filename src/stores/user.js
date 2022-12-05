import { defineStore } from 'pinia'
import { getUserPermissions } from '@/apis/permission'
import { generateRouteData, generateRouteTreeData } from '@/utils/common'
import router from '@/router'

export const userStore = defineStore({
  id: 'userSetting',
  state: () => ({
    token: null,
    menuPermissions: [],
    buttonPermissions: []
  }),
  getters: {
    getToken: (state) => state.token,
    getMenuPermissions: (state) => state.menuPermissions,
    getButtonPermissions: (state) => state.buttonPermissions
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setALlPermissions() {
      getUserPermissions().then((res) => {
        const routeData = generateRouteData(res.menu_permissions)
        for (const item of routeData) {
          if (item.meta.parent !== null) {
            router.addRoute(item.meta.parent, item)
          } else {
            router.addRoute(item)
          }
        }
        this.menuPermissions = routeData
        this.buttonPermissions = res.api_permissions
      })
    }
  },
  // 开启数据缓存
  persist: {
    key: 'userSetting',
    storage: localStorage
  }
})
