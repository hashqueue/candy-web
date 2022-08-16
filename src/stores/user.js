import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'userSetting',
  state: () => ({
    userInfo: null,
    token: null
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setToken(token) {
      this.token = token
    }
  },
  // 开启数据缓存
  persist: {
    key: 'userSetting',
    storage: localStorage
  }
})
