<template>
  <a-table
    v-if="dataSource.length"
    :columns="columns"
    :data-source="dataSource"
    :scroll="scroll"
    bordered
    :row-key="rowKey"
    :pagination="pagination"
    @change="onPageChange"
    :default-expand-all-rows="defaultExpandAllRows"
  >
    <template #bodyCell="{ column, record }">
      <slot name="action" :column="column" :record="record"></slot>
    </template>
  </a-table>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  dataSource: {
    type: Array,
    required: true
  },
  pagination: {
    type: Object,
    required: false
  },
  scroll: {
    type: Object,
    required: false
  },
  defaultExpandAllRows: {
    type: Boolean,
    default: false,
    required: false
  },
  rowKey: {
    type: String,
    default: 'id',
    required: false
  }
})
const emit = defineEmits(['onPageChange'])

const onPageChange = (pagination, filters, sorter, { currentDataSource }) => {
  emit('onPageChange', pagination, filters, sorter, currentDataSource)
}
</script>

<style scoped></style>
