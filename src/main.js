import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import * as AntdIcons from '@ant-design/icons-vue'

import store from '@/stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// 注册ant-design的所有图标
for (const [name, component] of Object.entries(AntdIcons)) {
  app.component(name, component)
}
app.use(store).use(router).use(Antd).mount('#app')
