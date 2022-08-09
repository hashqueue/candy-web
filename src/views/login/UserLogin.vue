<template>
  <div class="base-container">
    <a-row class="a-row-flex" justify="center" align="middle">
      <a-card class="login-box">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="login" tab="登录">
            <a-form
              :model="loginForm"
              name="login"
              :rules="loginRules"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 10 }"
              autocomplete="off"
              @finish="onLoginFinish"
              @finishFailed="onLoginFinishFailed"
            >
              <a-form-item label="用户名" name="username">
                <a-input v-model:value="loginForm.username" placeholder="请输入用户名或邮箱" :allow-clear="true">
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="密码" name="password">
                <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" :allow-clear="true">
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">登录</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="register" tab="注册">
            <a-form
              :model="registerForm"
              name="register"
              :rules="registerRules"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 10 }"
              autocomplete="off"
              @finish="onRegisterFinish"
              @finishFailed="onRegisterFinishFailed"
            >
              <a-form-item label="用户名" name="username">
                <a-input v-model:value="registerForm.username" placeholder="请输入用户名" :allow-clear="true">
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="邮箱" name="email">
                <a-input v-model:value="registerForm.email" placeholder="请输入邮箱" :allow-clear="true">
                  <template #prefix>
                    <MailOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="密码" name="password">
                <a-input-password v-model:value="registerForm.password" placeholder="请输入密码" :allow-clear="true">
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item label="确认密码" name="password_confirm">
                <a-input-password
                  v-model:value="registerForm.password_confirm"
                  placeholder="请输入确认密码"
                  :allow-clear="true"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">注册</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const activeKey = ref('login')
const loginForm = reactive({
  username: '',
  password: ''
})
const registerForm = reactive({
  username: '',
  password: '',
  email: '',
  password_confirm: ''
})
const loginRules = {
  username: [{ required: true, trigger: 'change', message: '用户名或邮箱不能为空.' }],
  password: [{ required: true, trigger: 'change', message: '密码不能为空.' }]
}
const registerRules = {
  username: [{ required: true, trigger: 'change', message: '用户名不能为空.' }],
  password: [{ required: true, trigger: 'change', message: '密码不能为空.' }],
  email: [{ required: true, trigger: 'change', message: '邮箱地址不能为空.' }],
  password_confirm: [{ required: true, trigger: 'change', message: '确认密码不能为空.' }]
}

const onLoginFinish = (values) => {
  console.log('Success:', values)
  if (values.username === 'admin' && values.password === '111111') {
    router.push('/dashboard')
  } else {
    message.error('账号或密码错误!')
  }
}

const onLoginFinishFailed = (errorInfo) => {
  message.error('输入有误！')
}

const onRegisterFinish = (values) => {
  console.log('Success:', values)
}

const onRegisterFinishFailed = (errorInfo) => {
  message.error('输入有误！')
}
</script>

<style scoped lang="less">
.base-container {
  width: 100vw;
  height: 100vh;
  background: #2c5364 url('src/assets/background.svg');
  .a-row-flex {
    height: 100%;
  }
  .login-box {
    width: 800px;
    height: 500px;
  }
}
</style>
