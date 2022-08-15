import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'userSetting',
  state: () => ({
    userInfo: null,
    token: null,
    menuSelectedKeys: []
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getMenuSelectedKeys: (state) => state.menuSelectedKeys
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setToken(token) {
      this.token = token
    },
    setMenuSelectedKeys(keys) {
      this.menuSelectedKeys = keys
    }
  },
  // 开启数据缓存
  persist: {
    key: 'userSetting',
    storage: localStorage
  }
})
