import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { tasksAPI } from "features/todolistList/todolist/task/api/tasksApi"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums/enums"
import { appActions } from "app/app-reducer"
import { createSlice } from "@reduxjs/toolkit"
import { todolistsActions } from "features/todolistList/model/todolistsReducer"
import { clearData } from "common/actions/commonActions"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { TasksStateType, TaskType, UpdateTaskModelType } from "features/todolistList/todolist/task/api/tasksApi.types"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todolistId]
        const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasksForTodolist[index] = {
            ...state[action.payload.todolistId][index],
            ...action.payload.domainModel,
          }
        }
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((todolist) => (state[todolist.id] = []))
      })
      .addCase(clearData, () => {
        return {}
      })
  },
})

// Thunks

export const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const response = await tasksAPI.getTasks(todolistId)
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolistId: todolistId, tasks: response.data.items }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error)
      return rejectWithValue(null)
    }
  },
)
export const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))

      const response = await tasksAPI.createTask(arg.todolistId, arg.title)
      if (response.data.resultCode === ResultCode.Succeeded) {
        const task = response.data.data.item
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { task }
      } else {
        handleServerAppError<{ item: TaskType }>(dispatch, response.data)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error)
      return rejectWithValue(null)
    }
  },
)
export const removeTask = createAppAsyncThunk<
  { todolistId: string; taskId: string },
  {
    todolistId: string
    taskId: string
  }
>(`${slice.name}/removeTask`, async ({ todolistId, taskId }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const response = await tasksAPI.deleteTask(todolistId, taskId)
    if (response.data.resultCode === ResultCode.Succeeded) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolistId, taskId }
    } else {
      handleServerAppError(dispatch, response.data)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error)
    return rejectWithValue(null)
  }
})
export const updateTask = createAppAsyncThunk<
  {
    todolistId: string
    taskId: string
    domainModel: UpdateDomainTaskModelType
  },
  {
    todolistId: string
    taskId: string
    domainModel: UpdateDomainTaskModelType
  }
>(`${slice.name}/updateTask`, async ({ todolistId, taskId, domainModel }, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const task = getState().tasks[todolistId].find((task) => task.id === taskId)

    if (!task) {
      return rejectWithValue(null)
    }
    let model: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      startDate: task.startDate,
      priority: task.priority,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    }

    const response = await tasksAPI.updateTask(todolistId, taskId, model)
    if (response.data.resultCode === ResultCode.Succeeded) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolistId, taskId, domainModel }
    } else {
      handleServerAppError(dispatch, response.data)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error)
    return rejectWithValue(null)
  }
})

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, removeTask, updateTask }
