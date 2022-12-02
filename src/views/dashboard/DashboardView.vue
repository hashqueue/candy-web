<template>
  <a-card class="card">
    <a-button @click="getUser">click</a-button>
    <Exc403View />
  </a-card>
  <a-card class="card">
    <Exc404View />
  </a-card>
  <a-card class="card">
    <Exc500View />
  </a-card>
</template>

<script setup>
import { getUserDetail } from '@/apis/user'
import Exc403View from '@/views/error-page/Exc403View.vue'
import Exc404View from '@/views/error-page/Exc404View.vue'
import Exc500View from '@/views/error-page/Exc500View.vue'

const getUser = () => {
  getUserDetail(1).then((res) => {
    console.log(res)
  })
}
</script>

<style scoped>
.card {
  height: 560px;
  margin-bottom: 10px;
}
</style>
