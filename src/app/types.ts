import { TaskPriorities, TaskStatuses } from "app/enums"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AppRootStateType } from "app/store"
import { AnyAction } from "redux"

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
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
