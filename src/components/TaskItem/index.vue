<template>
  <el-card class="task-item" shadow="hover" style="width: 25rem; height: 15rem">
    <template #header>
      <h3>{{ task.name }}</h3>
    </template>
    <el-progress
      :percentage="task.progress"
      :status="task.progress === 100 ? 'success' : ''"
      striped
      striped-flow
      :stroke-width="15"
      :duration="10"
    >
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">进度条</span>
      </template>
    </el-progress>
    <p v-if="task.createdAt">创建时间: {{ formatDate(task.createdAt) }}</p>
    <p v-if="task.completedAt">完成时间: {{ formatDate(task.completedAt) }}</p>
  </el-card>
</template>

<script lang="ts" setup>
interface Task {
  id: number;
  name: string;
  progress: number;
  createdAt: Date | null;
  completedAt: Date | null;
  phoneNumber: string;
}

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
</script>

<style scoped>
.task-item {
  /* text-align: center; */
}

h3 {
  margin: 0;
}

.el-progress {
  margin: 15px 0;
}
</style>
<style lang="css" scoped>
.percentage-value {
  display: block;
  margin-top: 0px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 0px;
  font-size: 12px;
}
</style>
