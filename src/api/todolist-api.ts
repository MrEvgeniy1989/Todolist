import axios, { AxiosResponse } from "axios"
import { LoginType } from "features/Login/Login"
import { ResponseType, TasksType, TaskType, TodolistType, UpdateTaskModelType, UserType } from "app/types"

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1",
})

export class AuthAPI {
  static login(data: LoginType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<
        ResponseType<{
          userId: number
        }>
      >,
      LoginType
    >(`/auth/login`, data)
  }

  static logOut() {
    return instance.delete<ResponseType>(`/auth/login`)
  }

  static me() {
    return instance.get<ResponseType<UserType>>(`/auth/me`)
  }
}

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`/todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<
        ResponseType<{
          item: TodolistType
        }>
      >,
      { title: string }
    >(`/todo-lists`, { title })
  },
  deleteTodolist(todoListId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
  },
  changeTodolistTitle(todoListId: string, title: string) {
    return instance.put<
      ResponseType,
      AxiosResponse<ResponseType>,
      {
        title: string
      }
    >(`/todo-lists/${todoListId}`, { title })
  },
}
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
