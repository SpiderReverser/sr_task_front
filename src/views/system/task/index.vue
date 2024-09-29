<template>
  <div class="task-progress-manager">
    <el-button type="primary" @click="showAddTaskDialog">新增任务</el-button>

    <div class="task-waterfall">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <TaskItem :task="task" @click="showTaskDetails(task)" />
      </div>
    </div>

    <AddTaskDialog v-model:visible="addTaskDialogVisible" @add-task="addTask" />

    <TaskDetailsDialog v-model:visible="taskDetailsDialogVisible" :task="selectedTask" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElButton } from "element-plus";

interface Task {
  id: number;
  name: string;
  progress: number;
  createdAt: Date;
  completedAt: Date | null;
  phoneNumber: string;
}

const tasks = ref<Task[]>([]);
const addTaskDialogVisible = ref(false);
const taskDetailsDialogVisible = ref(false);
const selectedTask = ref<Task | null>(null);

const showAddTaskDialog = () => {
  addTaskDialogVisible.value = true;
};

const addTask = (newTask: Omit<Task, "id">) => {
  const task: Task = {
    ...newTask,
    id: Date.now(),
    createdAt: new Date(),
    completedAt: null,
  };
  tasks.value.push(task);
};

const showTaskDetails = (task: Task) => {
  selectedTask.value = task;
  taskDetailsDialogVisible.value = true;
};

onMounted(() => {
  // 模拟从 API 获取任务数据
  tasks.value = [
    {
      id: 1,
      name: "完成项目报告",
      progress: 75,
      createdAt: new Date("2023-05-01"),
      completedAt: null,
      phoneNumber: "13800138000",
    },
    {
      id: 2,
      name: "客户会议",
      progress: 100,
      createdAt: new Date("2023-05-02"),
      completedAt: new Date("2023-05-03"),
      phoneNumber: "13900139000",
    },
    // 添加更多模拟数据...
  ];
});
</script>

<style scoped>
.task-progress-manager {
  padding: 20px;
}

.task-waterfall {
  column-count: 3;
  column-gap: 20px;
  margin-top: 20px;
}

.task-item {
  break-inside: avoid;
  margin-bottom: 20px;
}

@media (max-width: 1200px) {
  .task-waterfall {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .task-waterfall {
    column-count: 1;
  }
}
</style>
