<template>
  <a-row type="flex" justify="space-between">
    <a-col :span="20">
      <a-row>
        <a-col><img class="logo-img" src="@/assets/candy.svg" alt="logo" /></a-col>
        <a-col><h1 class="logo-title">Candy</h1></a-col>
        <a-col :span="22">
          <MenuLayout />
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="4">
      <a-row type="flex" justify="end">
        <a-col>
          <screenfull-view />
        </a-col>
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
import { ref } from 'vue'
import { removeAllItem } from '@/utils/storage'
import MenuLayout from './menu/MenuLayout.vue'
import BreadcrumbLayout from './BreadcrumbLayout.vue'
import ScreenfullView from '@/components/ScreenfullView.vue'
import { getUserProfile } from '@/apis/user'

const router = useRouter()
const userInfo = ref({
  username: '',
  avatar: ''
})

getUserProfile().then((res) => {
  userInfo.value = res
})
const logOut = () => {
  removeAllItem()
  router.push('/login')
}
</script>

<style scoped>
.avatar {
  margin-left: 15px;
  cursor: pointer;
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
