import request from "@/utils/request";

const TASK_BASE_URL = "/api";

class TaskAPI {

}

export default TaskAPI;

/** 角色分页查询参数 */
export interface TaskPageQuery extends PageQuery {
  /** 搜索关键字 */
  keywords?: string;
}

export interface Task {
  id: number
  name: string
  progress: number
  createdAt: Date
  completedAt: Date | null
  phoneNumber: string
}

export interface Props {
  visible: boolean
  task: Task | null
}

export interface Emits {
  (e: 'update:visible', value: boolean): void
}

