<template>
  <a-card style="width: 800px">
    <template #actions>
      <a-tooltip>
        <template #title>修改个人信息</template>
        <edit-outlined @click="editProfile" />
      </a-tooltip>
      <a-tooltip>
        <template #title>重置密码</template>
        <unlock-outlined @click="resetPassword" />
      </a-tooltip>
    </template>
    <a-card-meta title="个人资料" description="往事不回头, 余生莫将就~">
      <template #avatar v-if="userInfo !== null">
        <a-avatar :size="96" shape="square" :src="userInfo.avatar" />
      </template>
    </a-card-meta>
    <a-descriptions class="content" v-if="userInfo !== null">
      <a-descriptions-item label="用户名">{{ userInfo.username }}</a-descriptions-item>
      <a-descriptions-item label="邮箱">{{ userInfo.email }}</a-descriptions-item>
      <a-descriptions-item label="姓名">{{ userInfo.name }}</a-descriptions-item>
      <a-descriptions-item label="生日">{{ userInfo.birthday }}</a-descriptions-item>
      <a-descriptions-item label="性别">{{ userInfo.gender }}</a-descriptions-item>
      <a-descriptions-item label="手机号">{{ userInfo.mobile }}</a-descriptions-item>
      <a-descriptions-item label="职位">{{ userInfo.position }}</a-descriptions-item>
      <a-descriptions-item label="部门">{{ userInfo.department.name }}</a-descriptions-item>
      <a-descriptions-item label="加入时间">{{ userInfo.date_joined }}</a-descriptions-item>
      <a-descriptions-item label="角色">
        <template v-for="(role, index) in userInfo.roles" :key="index">
          <a-tag color="blue">{{ role.name }}</a-tag>
        </template>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { EditOutlined, UnlockOutlined } from '@ant-design/icons-vue'
import { getUserProfile } from '@/apis/user'

const userInfo = ref(null)
getUserProfile().then((res) => {
  userInfo.value = res
})

const editProfile = () => {
  console.log('edit')
}
const resetPassword = () => {
  console.log('reset')
}
</script>

<style scoped>
.content {
  margin-top: 8px;
}
</style>
