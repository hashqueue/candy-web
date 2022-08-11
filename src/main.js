import { createApp } from 'vue'

import store from '@/stores'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.less'
import router from './router'

const app = createApp(App)
app.use(store).use(router).use(Antd).mount('#app')
