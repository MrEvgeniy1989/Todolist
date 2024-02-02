import { createSlice } from "@reduxjs/toolkit"
import { clearData } from "common/actions/commonActions"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums/enums"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import { tasksAPI } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/api/tasksApi"
import {
  TasksStateType,
  TaskType,
  UpdateTaskModelType,
} from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/api/tasksApi.types"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((todolist) => {
          state[todolist.id] = []
        })
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
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
      .addCase(todolistsActions.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(clearData, () => {
        return {}
      })
  },
})

// Thunks
export const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId, _) => {
    const response = await tasksAPI.getTasks(todolistId)
    return { todolistId: todolistId, tasks: response.data.items }
  },
)
export const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
  `${slice.name}/addTask`,
  async (arg, { rejectWithValue }) => {
    const res = await tasksAPI.createTask(arg.todolistId, arg.title)
    if (res.data.resultCode === ResultCode.Succeeded) {
      const task = res.data.data.item
      return { task }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
export const deleteTask = createAppAsyncThunk<
  { todolistId: string; taskId: string },
  {
    todolistId: string
    taskId: string
  }
>(`${slice.name}/removeTask`, async ({ todolistId, taskId }, { rejectWithValue }) => {
  const res = await tasksAPI.deleteTask(todolistId, taskId)
  if (res.data.resultCode === ResultCode.Succeeded) {
    return { todolistId, taskId }
  } else {
    return rejectWithValue(res.data)
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
>(`${slice.name}/updateTask`, async ({ todolistId, taskId, domainModel }, { rejectWithValue, getState }) => {
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

  const res = await tasksAPI.updateTask(todolistId, taskId, model)
  if (res.data.resultCode === ResultCode.Succeeded) {
    return { todolistId, taskId, domainModel }
  } else {
    return rejectWithValue(res.data)
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
// export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, removeTask: deleteTask, updateTask }
