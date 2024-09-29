<template>
  <el-dialog title="任务详情" v-model="dialogVisible" @close="handleClose">
    <template v-if="task">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="任务名称">
          {{ task.name }}
        </el-descriptions-item>
        <el-descriptions-item label="进度">
          <el-progress
            :percentage="task.progress"
            :status="task.progress === 100 ? 'success' : ''"
          />
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ task.phoneNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ task.createdAt ? formatDate(task.createdAt) : "未知" }}
        </el-descriptions-item>
        <el-descriptions-item label="完成时间">
          {{ task.completedAt ? formatDate(task.completedAt) : "未完成" }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

interface Task {
  id: number;
  name: string;
  progress: number;
  createdAt: Date | null;
  completedAt: Date | null;
  phoneNumber: string;
}

interface Props {
  visible: boolean;
  task: Task | null;
}

interface Emits {
  (e: "update:visible", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const dialogVisible = ref(props.visible);

watch(
  () => props.visible,
  (newValue) => {
    dialogVisible.value = newValue;
  }
);

const handleClose = () => {
  emit("update:visible", false);
};

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
