<template>
  <a-menu class="menu-container" v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal">
    <a-menu-item key="1">menu-item-1</a-menu-item>
    <a-menu-item key="2">menu-item-2</a-menu-item>
    <a-menu-item key="3">menu-item-3</a-menu-item>
    <a-menu-item key="4">menu-item-4</a-menu-item>
    <a-menu-item key="5">menu-item-5</a-menu-item>
  </a-menu>
</template>

<script setup>
const props = defineProps({
  selectedKeys: Array
})
</script>

<style scoped>
.menu-container {
  line-height: 64px;
}
</style>
