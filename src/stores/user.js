import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'userSetting',
  state: () => ({
    token: '',
    menuPermissions: [],
    buttonPermissions: [],
    userRoutes: []
  }),
  getters: {
    getToken: (state) => state.token,
    getMenuPermissions: (state) => state.menuPermissions,
    getButtonPermissions: (state) => state.buttonPermissions,
    getUserRoutes: (state) => state.userRoutes
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setMenuPermissions(pMenuPermissions) {
      this.menuPermissions = pMenuPermissions
    },
    setButtonPermissions(pButtonPermissions) {
      this.buttonPermissions = pButtonPermissions
    },
    setUserRoutes(pRoutes) {
      this.userRoutes = pRoutes
    }
  },
  // 开启数据缓存
  persist: {
    key: 'userSetting',
    storage: localStorage
  }
})
