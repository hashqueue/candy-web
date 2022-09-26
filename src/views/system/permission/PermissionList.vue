PermissionCreate.vue
<template>
  <a-button class="add-btn" type="primary" @click="createRootPermission">新增根权限</a-button>
  <a-table :columns="columns" :data-source="dataList" row-key="id" bordered>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'is_menu'">
        <a-tag :color="record.is_menu ? 'geekblue' : 'green'">
          {{ record.is_menu ? '菜单' : 'API' }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'icon'">
        <a-tag color="geekblue" v-if="record.icon">
          <template #icon>
            <component :is="record.icon" />
          </template>
          {{ record.icon }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'component_path'">
        <a-tag color="geekblue" v-if="record.component_path">
          {{ record.component_path }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'is_visible'">
        <a-tag :color="record.is_menu ? 'geekblue' : 'red'" v-if="record.is_visible">
          {{ record.is_visible ? '是' : '否' }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'method'">
        <a-tag color="green" v-if="record.method">
          {{ record.method }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'url_path'">
        <a-tag color="green" v-if="record.url_path">
          {{ record.url_path }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="createSubPermission(record)">添加子权限</a>
          <a-divider type="vertical" />
          <a @click="updatePermission(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="deletePermission(record.id)">删除</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
  <!--  <organization-create-update-form-->
  <!--    :visible="visible"-->
  <!--    :title="title"-->
  <!--    :organization-id="organizationId"-->
  <!--    @close-modal="closeModal"-->
  <!--    @get-latest-organization-list="getLatestPermissionList"-->
  <!--  />-->
  <a-modal v-model:visible="delVisible" title="提示" @ok="handleDeleteOk">
    <p>
      <exclamation-circle-two-tone
        :style="{ fontSize: '17px', marginRight: '10px' }"
        two-tone-color="#FF0000"
      />此操作将删除该权限下所有的数据，是否继续？
    </p>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'
import { getPermissionTreeList, deletePermissionDetail } from '@/apis/permission'
// import PermissionCreateUpdateForm from './PermissionCreateUpdateForm.vue'

const dataList = ref([])
const visible = ref(false)
const delVisible = ref(false)
const delPermissionId = ref(undefined)
const title = ref('新增根权限')
const organizationId = ref(null)

const getPermissionTreeListData = () => {
  getPermissionTreeList().then((res) => {
    dataList.value = res.results
  })
}
getPermissionTreeListData()
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '类型',
    dataIndex: 'is_menu',
    key: 'is_menu'
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon'
  },
  {
    title: '组件路径',
    dataIndex: 'component_path',
    key: 'component_path'
  },
  {
    title: '是否显示',
    dataIndex: 'is_visible',
    key: 'is_visible'
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    key: 'method'
  },
  {
    title: '请求路径',
    dataIndex: 'url_path',
    key: 'url_path'
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

const createRootPermission = () => {
  title.value = '新增根权限'
  visible.value = true
}
const closeModal = () => {
  title.value = '新增根权限'
  visible.value = false
}
const getLatestPermissionList = () => {
  getPermissionTreeListData()
}
const createSubPermission = (record) => {
  organizationId.value = record.id
  title.value = '添加子权限'
  visible.value = true
}
const updatePermission = (record) => {
  organizationId.value = record.id
  title.value = '修改权限'
  visible.value = true
}
const handleDeleteOk = () => {
  deletePermissionDetail(delPermissionId.value).then(() => {
    delVisible.value = false
    getPermissionTreeListData()
  })
}
const deletePermission = (organizationId) => {
  // console.log(organizationId)
  delVisible.value = true
  delPermissionId.value = organizationId
}
</script>

<style scoped>
.add-btn {
  margin-bottom: 16px;
}
</style>
