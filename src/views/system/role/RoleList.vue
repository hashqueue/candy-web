<template>
  <a-button class="add-btn" type="primary" @click="createRole">新增角色</a-button>
  <a-table
    :columns="columns"
    :data-source="dataList"
    row-key="id"
    bordered
    :pagination="paginationData"
    @change="onPageChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <a @click="updateRole(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="setPermissions(record)">设置权限</a>
          <a-divider type="vertical" />
          <a @click="deleteRole(record.id)">删除</a>
        </span>
      </template>
    </template>
  </a-table>
  <role-create-update-form
    :visible="visible"
    :title="title"
    :role-id="roleId"
    @close-modal="closeModal"
    @get-latest-role-list="getLatestRoleList"
  />
  <a-modal v-model:visible="delVisible" title="提示" @ok="handleDeleteOk">
    <p>
      <exclamation-circle-two-tone
        :style="{ fontSize: '17px', marginRight: '10px' }"
        two-tone-color="#FF0000"
      />此操作将删除该角色下所有的数据，是否继续？
    </p>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'
import { deleteRoleDetail, getRoleList } from '@/apis/role'
import RoleCreateUpdateForm from './RoleCreateUpdateForm.vue'

const dataList = ref([])
const visible = ref(false)
const title = ref('新增角色')
const roleId = ref(null)
const delVisible = ref(false)
const delRoleId = ref(undefined)
const paginationData = ref(undefined)
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc'
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

const getRoleListData = () => {
  getRoleList().then((res) => {
    dataList.value = res.results
    paginationData.value = {
      total: res.count,
      current: res.current_page,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showSizeChanger: true,
      showTotal: () => `共 ${res.count} 条`
    }
  })
}
getRoleListData()
const getLatestRoleList = () => {
  getRoleListData()
}
const onPageChange = (pagination, filters, sorter, { currentDataSource }) => {
  const params = {}
  params.page = pagination.current
  params.size = pagination.pageSize
  getRoleList(params).then((res) => {
    // console.log(pagination)
    dataList.value = res.results
    paginationData.value = {
      total: res.count,
      current: res.current_page,
      pageSize: pagination.pageSize,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showSizeChanger: true,
      showTotal: () => `共 ${res.count} 条`
    }
  })
}
const createRole = () => {
  title.value = '新增角色'
  visible.value = true
}
const closeModal = () => {
  title.value = '新增角色'
  visible.value = false
}
const updateRole = (record) => {
  roleId.value = record.id
  title.value = '修改角色'
  visible.value = true
}
const setPermissions = (record) => {}
const handleDeleteOk = () => {
  deleteRoleDetail(delRoleId.value).then(() => {
    delVisible.value = false
    getRoleListData()
  })
}
const deleteRole = (roleId) => {
  // console.log(roleId)
  delVisible.value = true
  delRoleId.value = roleId
}
</script>

<style scoped>
.add-btn {
  margin-bottom: 16px;
}
</style>
