<template>
  <a-card class="card">
    <a-button @click="getUser">click</a-button>
  </a-card>
  <a-card class="card">2</a-card>
  <a-card class="card">3</a-card>
</template>

<script setup>
import { getUserInfo } from '@/apis/user'
const getUser = () => {
  getUserInfo(1).then((res) => {
    console.log(res)
  })
}
</script>

<style scoped>
.card {
  height: 300px;
  margin-bottom: 10px;
}
</style>
