<template>
  <a-row justify="space-between">
    <a-col :span="22">
      <a-row>
        <a-col><img class="logo-img" src="@/assets/candy.svg" alt="logo" /></a-col>
        <a-col><h1 class="logo-title">Candy</h1></a-col>
        <a-col :span="22">
          <MenuLayout :selected-keys="selectedKeys" />
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="2">
      <a-row justify="end">
        <a-col>
          <a-popover title="Hello Hashqueue!" placement="bottomRight" autoAdjustOverflow>
            <template #content>
              <a>
                <p>Profile</p>
              </a>
              <a>
                <p>Settings</p>
              </a>
              <a @click="logOut">
                <p>Log out</p>
              </a>
            </template>
            <a-avatar class="avatar" shape="square" src="https://joeschmoe.io/api/v1/random" :size="32"></a-avatar>
          </a-popover>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <BreadcrumbLayout />
</template>

<script setup>
import { useRouter } from 'vue-router'
import MenuLayout from './MenuLayout.vue'
import BreadcrumbLayout from './BreadcrumbLayout.vue'

const router = useRouter()
const props = defineProps({
  selectedKeys: Array
})
const logOut = () => {
  router.push('/login')
}
</script>

<style scoped>
.avatar {
  margin-left: 15px;
}
.logo-img {
  width: 36px;
  height: 36px;
}
.logo-title {
  color: #fff;
  margin-left: 16px;
  margin-right: 16px;
  font-weight: 600;
  font-size: 16px;
}
</style>
