import {
  AddTodolistACType,
  ClearTodolistsDataACType,
  DeleteTodolistACType,
  SetTodolistsType,
} from "features/TodolistList/Todolist/todolists-reducer"
import { Dispatch } from "redux"
import {
  ErrorType,
  ResultCode,
  TaskPriorities,
  tasksAPI,
  TasksStateType,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from "api/todolist-api"
import { AppRootStateType } from "app/store"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import axios, { AxiosError } from "axios"

type ActionType =
  | DeleteTaskACType
  | AddTaskACType
  | DeleteTodolistACType
  | AddTodolistACType
  | SetTodolistsType
  | SetTasksType
  | UpdateTaskACType
  | ClearTodolistsDataACType

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      const copyState = { ...state }
      action.todolists.forEach((todolist) => (copyState[todolist.id] = []))
      return copyState
    }
    case "SET-TASKS": {
      return { ...state, [action.todolistId]: action.tasks }
    }
    case "ADD_TASK": {
      return { ...state, [action.todolistId]: [action.task, ...state[action.todolistId]] }
    }
    case "DELETE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.taskId,
        ),
      }
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.domainModel } : task,
        ),
      }
    }
    case "ADD_TODOLIST": {
      return { ...state, [action.todolist.id]: [] }
    }
    case "DELETE_TODOLIST": {
      const copyState = { ...state }
      delete copyState[action.todolistId]
      return copyState
    }
    case "CLEAR-DATA": {
      return {}
    }
    default: {
      return state
    }
  }
}

// ActionCreators

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({ type: "SET-TASKS", todolistId, tasks }) as const
export const addTaskAC = (todolistId: string, task: TaskType) => ({ type: "ADD_TASK", todolistId, task }) as const
export const deleteTaskAC = (todolistId: string, taskId: string) =>
  ({
    type: "DELETE_TASK",
    payload: { todolistId, taskId },
  }) as const
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
  ({
    type: "UPDATE-TASK",
    todolistId,
    taskId,
    domainModel,
  }) as const

// Thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksAPI.getTasks(todolistId).then((response) => {
    dispatch(setTasksAC(todolistId, response.data.items))
    dispatch(setAppStatusAC("succeeded"))
  })
}
export const removeTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  // tasksAPI.deleteTask(todolistId, taskId)
  // .then((response) => {
  //     if (response.data.resultCode === ResultCode.Succeeded) {
  //         dispatch(deleteTaskAC(todolistId, taskId))
  //         dispatch(setAppStatusAC('succeeded'))
  //     } else {
  //         if (response.data.messages.length) {
  //             dispatch(setAppErrorAC(response.data.messages[0]))
  //         } else {
  //             dispatch(setAppErrorAC('Обратитесь в службу поддержки.'))
  //         }
  //         dispatch(setAppStatusAC('failed'))
  //     }
  // })
  // .catch(error => {
  //     handleServerNetworkError(dispatch, error)
  // })

  try {
    const response = await tasksAPI.deleteTask(todolistId, taskId)
    if (response.data.resultCode === ResultCode.Succeeded) {
      dispatch(deleteTaskAC(todolistId, taskId))
      dispatch(setAppStatusAC("succeeded"))
    } else {
      if (response.data.messages.length) {
        dispatch(setAppErrorAC(response.data.messages[0]))
      } else {
        dispatch(setAppErrorAC("Обратитесь в службу поддержки."))
      }
      dispatch(setAppStatusAC("failed"))
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response?.data.messages[0] : e.message
      handleServerNetworkError(dispatch, error)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksAPI
    .createTask(todolistId, title)
    .then((response) => {
      if (response.data.resultCode === ResultCode.Succeeded) {
        dispatch(addTaskAC(todolistId, response.data.data.item))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError<{ item: TaskType }>(dispatch, response.data)
      }
    })
    .catch((e: AxiosError<ErrorType>) => {
      const error = e.response?.data ? e.response?.data.messages[0] : e.message
      handleServerNetworkError(dispatch, error)
    })
}
export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))
    const task = getState().tasks[todolistId].find((task) => task.id === taskId)

    if (task) {
      let model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        priority: task.priority,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      }

      tasksAPI.updateTask(todolistId, taskId, model).then(() => {
        dispatch(updateTaskAC(todolistId, taskId, domainModel))
        dispatch(setAppStatusAC("succeeded"))
      })
    }
  }

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
