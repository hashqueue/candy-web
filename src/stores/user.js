import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'userSetting',
  state: () => ({
    token: null
  }),
  getters: {
    getToken: (state) => state.token
  },
  actions: {
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
