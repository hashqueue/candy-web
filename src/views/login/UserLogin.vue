<template>
  <div class="login flex-r-c">
    <div class="login-box flex-c">
      <p style="text-align: center; font-size: 20px; font-weight: bold"><i>Welcome To DsAdmin</i></p>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const formState = reactive({
  username: '',
  password: ''
})

const onFinish = (values) => {
  const { username, password } = values
  if (username === 'admin' && password === '123456') {
    router.push('/dashboard')
  } else {
    message.error('登陆失败')
  }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background: #2c5364 url('src/assets/background.svg');

  .login-box {
    padding: 30px 60px;
    background-color: #fff;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    opacity: 0.95;
  }
}
</style>
