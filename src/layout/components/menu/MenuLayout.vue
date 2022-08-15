<template>
  <!-- 一级menu菜单 -->
  <a-menu class="menu-container" theme="dark" mode="horizontal" @click="clickMenuItem" :selectedKeys="selectedKeys">
    <!--    <SubMenuItem v-for="item in routes" :route="item" />-->
    <template v-for="item in routes" :key="item.path">
      <template v-if="item.children.length === 0">
        <a-menu-item :key="item.path">
          <template #icon>
            <!-- main.js中全局注册图标后可以这么使用 -->
            <component :is="item.meta.icon" />
          </template>
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu-item :key="item.path" :menu-info="item" />
      </template>
    </template>
  </a-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import { systemStore } from '@/stores/system'
import SubMenuItem from './SubMenuItem.vue'

const router = useRouter()
const systemInfoStore = systemStore()
const selectedKeys = computed(() => systemInfoStore.getMenuSelectedKeys)
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

const clickMenuItem = ({ item, key, keyPath }) => {
  // console.log(key)
  router.push(key)
  systemInfoStore.setMenuSelectedKeys([key])
}
</script>

<style scoped>
.menu-container {
  line-height: 64px;
}
</style>
