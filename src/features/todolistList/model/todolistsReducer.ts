import { appActions } from "app/app-reducer"
import { RequestStatusType } from "common/types/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearData } from "common/actions/commonActions"
import { tasksThunks } from "features/todolistList/todolist/task/model/tasks-reducer"
import { AppThunk } from "app/store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { FilterType, TodolistType } from "features/todolistList/api/todolistsApi.types"
import { todolistsAPI } from "features/todolistList/api/todolistsApi"

export type TodolistDomainType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; newTodolistTitle: string }>) => {
      // const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      // if (index !== -1) {
      //   state[index].title = action.payload.newTodolistTitle
      // }
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.title = action.payload.newTodolistTitle
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; newFilter: FilterType }>) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.newFilter
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{
        todolistId: string
        newEntityStatus: RequestStatusType
      }>,
    ) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.entityStatus = action.payload.newEntityStatus
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" }))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearData, () => {
      return []
    })
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

// Thunks
export const getTodolistsTC = (): AppThunk => (dispatch: any) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(todolistsActions.setTodolists({ todolists: res.data }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return res.data
    })
    .then((todolists) => {
      todolists.forEach((todolist) => {
        dispatch(tasksThunks.fetchTasks(todolist.id))
      })
    })
}
export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
export const deleteTodolistTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: todolistId, newEntityStatus: "loading" }))
    todolistsAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(todolistsActions.removeTodolist({ todolistId: todolistId }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        dispatch(appActions.setAppError({ error: err.message }))
        dispatch(
          todolistsActions.changeTodolistEntityStatus({
            todolistId: todolistId,
            newEntityStatus: "failed",
          }),
        )
        dispatch(appActions.setAppError({ error: "failed" }))
      })
  }
export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.changeTodolistTitle(todolistId, title).then(() => {
      dispatch(todolistsActions.changeTodolistTitle({ todolistId: todolistId, newTodolistTitle: title }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
