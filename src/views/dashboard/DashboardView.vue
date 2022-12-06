<template>
  <a-card title="代码块(Python)" class="card">
    <a-switch
      style="margin-bottom: 15px"
      v-model:checked="editorOptions.readOnly"
      checked-children="只读状态"
      un-checked-children="编辑状态"
    />
    <monaco-editor v-model:content-value="code" :editor-options="editorOptions"></monaco-editor>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { getUserDetail } from '@/apis/user'
import MonacoEditor from '@/components/MonacoEditor.vue'

const code = ref(
  'def copy(src_path, dst_path):\n' +
    "    src_file = open(src_path, 'r')\n" +
    "    dst_file = open(dst_path, 'w')\n" +
    '    for line in src_file:\n' +
    '        dst_file.write(line)\n' +
    '    src_file.close()\n' +
    '    dst_file.close()\n' +
    '\n' +
    "copy('test.txt', 'test.bak')\n"
)
const editorOptions = ref({
  formatOnPaste: true,
  formatOnType: true,
  automaticLayout: true, // 自动撑开布局
  language: 'python', // 语言
  readOnly: true, // 只读
  tabSize: 2, // tab 缩进长度
  fontSize: 16, // 字体大小
  theme: 'vs-dark', // 官方自带三种主题vs, hc-black, or vs-dark
  divWidth: '100%',
  divHeight: '400px',
  minimap: {
    enabled: false // 不显示代码缩略图
  }
})
const getUser = () => {
  getUserDetail(1).then((res) => {
    console.log(res)
  })
}
</script>

<style scoped>
.card {
  height: 560px;
  width: 50%;
  margin-bottom: 10px;
}
</style>
