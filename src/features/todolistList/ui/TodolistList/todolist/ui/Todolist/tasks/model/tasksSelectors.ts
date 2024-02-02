import { AppRootStateType } from "app/store"
import { TaskType } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/api/tasksApi.types"

export const selectorTasks =
  (todolistId: string) =>
  (state: AppRootStateType): TaskType[] =>
    state.tasks[todolistId]
