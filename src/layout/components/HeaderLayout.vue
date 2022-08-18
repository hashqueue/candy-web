<template>
  <a-row justify="space-between">
    <a-col :span="22">
      <a-row>
        <a-col><img class="logo-img" src="@/assets/candy.svg" alt="logo" /></a-col>
        <a-col><h1 class="logo-title">Candy</h1></a-col>
        <a-col :span="22">
          <MenuLayout />
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="2">
      <a-row justify="end">
        <a-col>
          <a-popover :title="`Hello ${userInfo.username}!`">
            <template #content>
              <p><a>个人资料</a></p>
              <p><a @click="logOut">登出</a></p>
            </template>
            <a-avatar class="avatar" shape="square" :src="userInfo.avatar" :size="32"></a-avatar>
          </a-popover>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <BreadcrumbLayout />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { userStore } from '@/stores/user'
import { removeAllItem } from '@/utils/storage'
import MenuLayout from './menu/MenuLayout.vue'
import BreadcrumbLayout from './BreadcrumbLayout.vue'

const userInfoStore = userStore()
const userInfo = computed(() => userInfoStore.getUserInfo)
const router = useRouter()
const logOut = () => {
  removeAllItem()
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
