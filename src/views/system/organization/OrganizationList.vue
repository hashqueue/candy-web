<template>
  <a-button class="add-btn" type="primary" @click="addOrganization">新增</a-button>
  <a-table :columns="columns" :data-source="dataList">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'type'">
        <a-tag :color="record.type === 'company' ? 'geekblue' : 'green'">
          {{ record.type === 'company' ? '公司' : '部门' }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>修改</a>
          <a-divider type="vertical" />
          <a>删除</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { ref } from 'vue'
import { getOrganizationList } from '@/apis/organization'

const dataList = ref([])
getOrganizationList().then((res) => {
  dataList.value = res.results
})

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '修改时间',
    dataIndex: 'update_time',
    key: 'update_time'
  },
  {
    title: '操作',
    key: 'action'
  }
]

const addOrganization = () => {}
</script>

<style scoped>
.add-btn {
  margin-bottom: 16px;
}
</style>
