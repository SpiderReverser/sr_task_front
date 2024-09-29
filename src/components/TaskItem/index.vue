<template>
  <el-card class="task-item" shadow="hover">
    <h3>{{ task.name }}</h3>
    <el-progress type="circle" :percentage="task.progress" :status="task.progress === 100 ? 'success' : ''" />
    <p>创建时间: {{ formatDate(task.createdAt) }}</p>
    <p v-if="task.completedAt">
      完成时间: {{ formatDate(task.completedAt) }}
    </p>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard, ElProgress } from 'element-plus'

interface Task {
  id: number
  name: string
  progress: number
  createdAt: Date
  completedAt: Date | null
  phoneNumber: string
}

interface Props {
  task: Task
}

const props = defineProps<Props>()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.task-item {
  text-align: center;
}

h3 {
  margin-bottom: 15px;
}

.el-progress {
  margin: 15px 0;
}
</style>
