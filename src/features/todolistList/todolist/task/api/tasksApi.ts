import { AxiosResponse } from "axios"
import { ResponseType } from "common/types/types"
import { instance } from "common/api/instance"
import { TasksType, TaskType, UpdateTaskModelType } from "features/todolistList/todolist/task/api/tasksApi.types"

export const tasksAPI = {
  getTasks(todoListId: string) {
    return instance.get<TasksType>(`/todo-lists/${todoListId}/tasks`)
  },
  createTask(todoListId: string, title: string) {
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      {
        title: string
      }
    >(`/todo-lists/${todoListId}/tasks`, { title })
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<
        ResponseType<{
          item: TaskType
        }>
      >,
      UpdateTaskModelType
    >(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
}
