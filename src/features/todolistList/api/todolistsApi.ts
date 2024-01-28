import { instance } from "common/api/instance"
import { BaseResponseType } from "common/types/types"
import { AxiosResponse } from "axios"
import { TodolistType } from "features/todolistList/api/todolistsApi.types"

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`/todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<
        BaseResponseType<{
          item: TodolistType
        }>
      >,
      { title: string }
    >(`/todo-lists`, { title })
  },
  deleteTodolist(todoListId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todoListId}`)
  },
  changeTodolistTitle(todoListId: string, title: string) {
    return instance.put<
      BaseResponseType,
      AxiosResponse<BaseResponseType>,
      {
        title: string
      }
    >(`/todo-lists/${todoListId}`, { title })
  },
}
