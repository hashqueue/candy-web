<template>
  <a-card title="CPU实时数据" class="card">
    <v-chart class="chart" :option="cpuOption" />
  </a-card>
  <a-card title="内存实时数据" class="card">
    <v-chart class="chart" :option="memoryOption" />
  </a-card>
  <a-card title="磁盘实时数据" class="card">
    <v-chart class="chart" :option="diskOption" />
  </a-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { use } from 'echarts/core'
import { message } from 'ant-design-vue'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { UniversalTransition } from 'echarts/features'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, UniversalTransition])

let wsPublishInterval
const webSocket = new WebSocket(`${import.meta.env.VITE_WS_URL}/server/get-performance-data/`)
const date = ref([])
// memory
const totalMemory = ref([])
const availableMemory = ref([])
const freeMemory = ref([])
const usedMemory = ref([])
const memoryPercent = ref([])
const memoryOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    left: 'center',
    data: ['Total Memory(GB)', 'Available Memory(GB)', 'Free Memory(GB)', 'Used Memory(GB)', 'Memory Percent(%)']
  },
  xAxis: {
    type: 'category',
    data: date.value
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Total Memory(GB)',
      type: 'line',
      showSymbol: false,
      data: totalMemory.value
    },
    {
      name: 'Available Memory(GB)',
      type: 'line',
      showSymbol: false,
      data: availableMemory.value
    },
    {
      name: 'Free Memory(GB)',
      type: 'line',
      showSymbol: false,
      data: freeMemory.value
    },
    {
      name: 'Used Memory(GB)',
      type: 'line',
      showSymbol: false,
      data: usedMemory.value
    },
    {
      name: 'Memory Percent(%)',
      type: 'line',
      showSymbol: false,
      data: memoryPercent.value
    }
  ]
})
// cpu
const cpuCount = ref([])
const cpuPercent = ref([])
const cpuOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    left: 'center',
    data: ['Cpu Count(核)', 'Cpu Percent(%)']
  },
  xAxis: {
    type: 'category',
    data: date.value
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Cpu Count(核)',
      type: 'line',
      showSymbol: false,
      data: cpuCount.value
    },
    {
      name: 'Cpu Percent(%)',
      type: 'line',
      showSymbol: false,
      data: cpuPercent.value
    }
  ]
})
//disk
const totalDisk = ref([])
const usedDisk = ref([])
const freeDisk = ref([])
const diskPercent = ref([])
const diskOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    left: 'center',
    data: ['Total Disk(GB)', 'Used Disk(GB)', 'Free Disk(GB)', 'Disk Percent(%)']
  },
  xAxis: {
    type: 'category',
    data: date.value
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Total Disk(GB)',
      type: 'line',
      showSymbol: false,
      data: totalDisk.value
    },
    {
      name: 'Used Disk(GB)',
      type: 'line',
      showSymbol: false,
      data: usedDisk.value
    },
    {
      name: 'Free Disk(GB)',
      type: 'line',
      showSymbol: false,
      data: freeDisk.value
    },
    {
      name: 'Disk Percent(%)',
      type: 'line',
      showSymbol: false,
      data: diskPercent.value
    }
  ]
})

const removeArrFirstElementBeginPushElement = (arr, value) => {
  if (arr.length === 200) {
    arr.shift()
  }
  arr.push(value)
}

onMounted(() => {
  webSocket.onopen = (event) => {
    message.success('与server建立ws连接成功.')
    wsPublishInterval = setInterval(() => {
      webSocket.send(JSON.stringify({ action: 'get-performance-data' }))
    }, 2000)
  }
  webSocket.onerror = (event) => {
    message.error('与server建立ws连接时出错.', 5)
  }
  webSocket.onmessage = (event) => {
    // 当接收到ws server推送过来的数据时触发
    // date
    const serverData = JSON.parse(event.data).data
    const dateNow = new Date()
    const now = dateNow.toLocaleTimeString()
    removeArrFirstElementBeginPushElement(date.value, now)
    //cpu
    removeArrFirstElementBeginPushElement(cpuCount.value, serverData.cpu.cpu_count)
    removeArrFirstElementBeginPushElement(cpuPercent.value, serverData.cpu.cpu_percent)
    // memory
    removeArrFirstElementBeginPushElement(totalMemory.value, serverData.memory.total_memory)
    removeArrFirstElementBeginPushElement(availableMemory.value, serverData.memory.available_memory)
    removeArrFirstElementBeginPushElement(freeMemory.value, serverData.memory.free_memory)
    removeArrFirstElementBeginPushElement(usedMemory.value, serverData.memory.used_memory)
    removeArrFirstElementBeginPushElement(memoryPercent.value, serverData.memory.memory_percent)
    // disk
    removeArrFirstElementBeginPushElement(totalDisk.value, serverData.disk.total_disk)
    removeArrFirstElementBeginPushElement(usedDisk.value, serverData.disk.used_disk)
    removeArrFirstElementBeginPushElement(freeDisk.value, serverData.disk.free_disk)
    removeArrFirstElementBeginPushElement(diskPercent.value, serverData.disk.disk_percent)
  }
  webSocket.onclose = (event) => {
    message.info('已与server断开ws连接.', 3)
  }
})
onUnmounted(() => {
  // 关闭当前连接
  webSocket.close()
  // 取消定时器
  clearInterval(wsPublishInterval)
})
</script>

<style scoped>
.card {
  height: 600px;
  width: 100%;
  margin-bottom: 10px;
}
.chart {
  width: 100%;
  height: 500px;
}
</style>
