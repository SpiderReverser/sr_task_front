<template>
  <el-dialog title="新增任务" v-model="dialogVisible" @close="handleClose">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="进度" prop="progress">
        <el-slider v-model="form.progress" :step="1" :min="0" :max="100" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { ElDialog, ElForm, ElFormItem, ElInput, ElSlider, ElButton } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface Props {
  visible: boolean
}

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'add-task', task: {
    name: string
    progress: number
    phoneNumber: string
  }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const dialogVisible = ref(props.visible)



const formRef = ref<FormInstance>()

const form = reactive({
  name: '',
  phoneNumber: '',
  progress: 0
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
  ],
  progress: [{ required: true, message: '请设置任务进度', trigger: 'change' }]
}

const handleClose = () => {
  emit('update:visible', false)
  formRef.value?.resetFields()
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid, fields) => {
    if (valid) {
      emit('add-task', {
        name: form.name,
        progress: form.progress,
        phoneNumber: form.phoneNumber
      })
      handleClose()
    }
  })
}

watch(() => props.visible, (newValue) => {
  dialogVisible.value = newValue
})

</script>
