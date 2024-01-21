import axios, { AxiosResponse } from "axios"
import { LoginType } from "../features/Login/Login"

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

// types
export type UserType = {
  id: number
  email: string
  login: string
}
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: T
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4,
}

export enum ResultCode {
  Succeeded = 0,
  Error = 1,
  Captcha = 10,
}

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

export type FilterType = "all" | "active" | "completed"
export type TasksStateType = {
  [key: string]: TaskType[]
}

export type ErrorType = {
  statusCode: number
  messages: string[]
  error: string
}
