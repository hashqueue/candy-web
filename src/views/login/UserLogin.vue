<template>
  <div
    class="base-container"
    :style="{
      background:
        mode === 'development' ? '#f0f2f5 url(\'src/assets/background.svg\') no-repeat' : `url(${backgroundSvg})`
    }"
  >
    <a-spin tip="正在登录中，请稍后..." :spinning="spinning">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/candy.svg" />
          <span class="title">Candy Admin</span>
        </div>
        <div class="desc">基于Django3.2 + Vue3 + MySQL8 可进行二次开发的Admin脚手架</div>
        <div class="desc-system">
          <div>用户名：test，密码：test3306，拥有普通用户权限</div>
          <div>用户名：admin，密码：admin3306，拥有超级管理员权限</div>
          <div>演示环境默认禁用所有数据删除权限</div>
        </div>
      </div>
      <div class="login-box">
        <a-tabs v-model:activeKey="activeKey" size="large" centered>
          <a-tab-pane key="login" tab="登录">
            <a-form
              ref="loginFormRef"
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
                <a-input
                  v-model:value="loginForm.username"
                  size="large"
                  placeholder="请输入用户名或邮箱"
                  :allow-clear="true"
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="密码" name="password">
                <a-input-password
                  v-model:value="loginForm.password"
                  size="large"
                  placeholder="请输入密码"
                  :allow-clear="true"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item :wrapper-col="{ offset: 8, span: 10 }">
                <a-button type="primary" size="large" class="login-button" html-type="submit">登录</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="register" tab="注册">
            <a-form
              ref="registerFormRef"
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
                <a-input
                  v-model:value="registerForm.username"
                  size="large"
                  placeholder="请输入用户名"
                  :allow-clear="true"
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="邮箱" name="email">
                <a-input v-model:value="registerForm.email" size="large" placeholder="请输入邮箱" :allow-clear="true">
                  <template #prefix>
                    <MailOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="密码" name="password">
                <a-input-password
                  v-model:value="registerForm.password"
                  size="large"
                  placeholder="请输入密码"
                  :allow-clear="true"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item label="确认密码" name="password_confirm">
                <a-input-password
                  v-model:value="registerForm.password_confirm"
                  size="large"
                  placeholder="请再次输入密码"
                  :allow-clear="true"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item :wrapper-col="{ offset: 8, span: 10 }">
                <a-button type="primary" size="large" class="login-button" html-type="submit">注册</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { reactive, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { login, register } from '@/apis/login'
import { userStore } from '@/stores/user'
import backgroundSvg from '@/assets/background.svg'

let pushToDashboardInterval
const mode = import.meta.env.MODE
const userSettingStore = userStore()
const router = useRouter()
const spinning = ref(false)
const activeKey = ref('login')
const loginFormRef = ref()
const registerFormRef = ref()
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
  username: [
    { required: true, trigger: 'change', message: '用户名不能为空.' },
    { min: 1, trigger: 'change', message: '用户名不能少于1位!' },
    { max: 150, trigger: 'change', message: '用户名不能多于150位!' }
  ],
  password: [
    { required: true, trigger: 'change', message: '密码不能为空.' },
    { min: 8, trigger: 'change', message: '密码不能少于8位!' },
    { max: 128, trigger: 'change', message: '密码不能多于128位!' }
  ],
  email: [
    { required: true, trigger: 'change', message: '邮箱地址不能为空.' },
    { max: 254, trigger: 'change', message: '用户名不能多于254位!' }
  ],
  password_confirm: [
    { required: true, trigger: 'change', message: '确认密码不能为空.' },
    { min: 8, trigger: 'change', message: '确认密码不能少于8位!' },
    { max: 128, trigger: 'change', message: '确认密码不能多于128位!' }
  ]
}

const onLoginFinish = (values) => {
  spinning.value = true
  login(values)
    .then((res) => {
      userSettingStore.setToken(res.access)
      pushToDashboardInterval = setInterval(() => {
        loginFormRef.value.resetFields()
        spinning.value = false
        router.push('/dashboard')
      }, 1000)
    })
    .catch(() => {
      spinning.value = false
    })
}

const onLoginFinishFailed = (errorInfo) => {
  message.error('输入有误.')
}

const onRegisterFinish = (values) => {
  register(values).then(() => {
    loginForm.username = values.username
    loginForm.password = values.password
    registerFormRef.value.resetFields()
    activeKey.value = 'login'
  })
}

const onRegisterFinishFailed = (errorInfo) => {
  message.error('输入有误.')
}
onUnmounted(() => {
  // 取消定时器
  clearInterval(pushToDashboardInterval)
})
</script>

<style scoped lang="less">
.base-container {
  display: flex;
  // 元素垂直显示
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  //background: #f0f2f5 url('src/assets/background.svg') no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
  @media (min-width: 768px) {
    padding: 112px 0 24px;
  }
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: fade(#000, 85%);
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: fade(#000, 45%);
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login-box {
    width: 800px;
    margin: 0 auto;
    .login-button {
      width: 100%;
    }
  }
}
</style>
