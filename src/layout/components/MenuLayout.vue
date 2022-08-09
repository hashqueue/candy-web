<template>
  <a-menu class="menu-container" v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal">
    <template v-for="(item, index) in 20" :key="index">
      <a-menu-item>{{ item }} - {{ index }}</a-menu-item>
    </template>
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
