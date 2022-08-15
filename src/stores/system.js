import { defineStore } from 'pinia'

export const systemStore = defineStore({
  id: 'systemSetting',
  state: () => ({
    menuSelectedKeys: []
  }),
  getters: {
    getMenuSelectedKeys: (state) => state.menuSelectedKeys
  },
  actions: {
    setMenuSelectedKeys(keys) {
      this.menuSelectedKeys = keys
    }
  },
  // 开启数据缓存
  persist: {
    key: 'systemSetting',
    storage: localStorage
  }
})
