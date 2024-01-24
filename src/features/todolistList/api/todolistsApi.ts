import { instance } from "common/api/instance"
import { ResponseType } from "common/types/types"
import { AxiosResponse } from "axios"
import { TodolistType } from "features/todolistList/api/todolistsApi.types"

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
