<template>
  <a-layout class="root-container">
    <a-layout-header class="header-container">
      <HeaderLayout :selected-keys="selectedKeys" />
    </a-layout-header>
    <a-layout-content class="main-container">
      <ContentLayout />
    </a-layout-content>
    <a-layout-footer class="footer-container"> Candy Web ©2022 Created by hashqueue</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import HeaderLayout from './components/HeaderLayout.vue'
import ContentLayout from './components/ContentLayout.vue'

const selectedKeys = ref(['2'])
</script>

<style scoped>
.root-container {
  height: 100vh;
}
.header-container {
  position: fixed;
  width: 100%;
}
.main-container {
  padding: 0 50px;
  margin-top: 132px;
  overflow-y: auto;
}
.footer-container {
  text-align: center;
}
</style>
