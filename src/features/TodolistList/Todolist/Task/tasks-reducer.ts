import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import axios, { AxiosError } from "axios"
import { AppThunk, ErrorType, TasksStateType, TaskType, UpdateTaskModelType } from "app/types"
import { tasksAPI } from "api/todolist-api"
import { ResultCode, TaskPriorities, TaskStatuses } from "app/enums"
import { appActions } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todolistsActions } from "features/TodolistList/Todolist/todolists-reducer"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ todolistId: string; task: TaskType }>) => {
      state[action.payload.todolistId].unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; domainModel: UpdateDomainTaskModelType }>,
    ) => {
      const tasksForTodolist = state[action.payload.todolistId]
      const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasksForTodolist[index] = {
          ...state[action.payload.todolistId][index],
          ...action.payload.domainModel,
        }
      }
    },
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((todolist) => (state[todolist.id] = []))
      })
      .addCase(todolistsActions.clearData, () => {
        return {}
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

// Thunks
export const getTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    tasksAPI.getTasks(todolistId).then((response) => {
      dispatch(tasksActions.setTasks({ todolistId: todolistId, tasks: response.data.items }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
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
        dispatch(tasksActions.removeTask({ todolistId: todolistId, taskId: taskId }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(dispatch, response.data)
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
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    tasksAPI
      .createTask(todolistId, title)
      .then((response) => {
        if (response.data.resultCode === ResultCode.Succeeded) {
          dispatch(tasksActions.addTask({ todolistId: todolistId, task: response.data.data.item }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError<{ item: TaskType }>(dispatch, response.data)
        }
      })
      .catch((e: AxiosError<ErrorType>) => {
        if (axios.isAxiosError<ErrorType>(e)) {
          const error = e.response?.data ? e.response?.data.messages[0] : e.message
          handleServerNetworkError(dispatch, error)
        } else {
          handleServerNetworkError(dispatch, (e as Error).message)
        }
      })
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
  (dispatch, getState) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
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
        dispatch(
          tasksActions.updateTask({
            todolistId: todolistId,
            taskId: taskId,
            domainModel: domainModel,
          }),
        )
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
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
