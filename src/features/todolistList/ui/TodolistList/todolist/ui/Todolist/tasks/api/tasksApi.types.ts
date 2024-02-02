import { TaskPriorities, TaskStatuses } from "common/enums/enums"

export type TaskType = {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  addedDate: string
}
export type TasksType = {
  items: TaskType[]
  totalCount: number
  error: string | null
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type TasksStateType = {
  [key: string]: TaskType[]
}
