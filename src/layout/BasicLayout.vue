<template>
  <a-layout class="root-container">
    <a-layout-header class="header-container">
      <HeaderLayout />
    </a-layout-header>
    <a-layout-content class="main-container">
      <ContentLayout />
    </a-layout-content>
    <a-layout-footer class="footer-container"> Candy Web ©2022 Created by hashqueue</a-layout-footer>
  </a-layout>
</template>

<script setup>
import HeaderLayout from './components/HeaderLayout.vue'
import ContentLayout from './components/ContentLayout.vue'
</script>

<style scoped>
.root-container {
  height: 100vh;
}
.ant-layout-header {
  padding: 0 20px;
}
.header-container {
  position: fixed;
  zindex: 1;
  width: 100%;
}
.main-container {
  padding: 0 20px;
  margin-top: 100px;
  overflow-y: auto;
}
.footer-container {
  text-align: center;
}
</style>
