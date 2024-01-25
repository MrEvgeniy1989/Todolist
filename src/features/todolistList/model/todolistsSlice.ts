import { appActions } from "app/appSlice"
import { RequestStatusType } from "common/types/types"
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearData } from "common/actions/commonActions"
import { tasksThunks } from "features/todolistList/todolist/task/model/tasksSlice"
import { AppDispatch } from "app/store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { FilterType, TodolistType } from "features/todolistList/api/todolistsApi.types"
import { todolistsAPI } from "features/todolistList/api/todolistsApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "common/enums/enums"

export type TodolistDomainType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      fetchTodolists: createAThunk<undefined, { todolists: TodolistType[] }>(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }))
            const res = await todolistsAPI.getTodolists()
            const todolists = res.data
            todolists.forEach((todolist) => {
              ;(dispatch as AppDispatch)(tasksThunks.fetchTasks(todolist.id))
            })
            dispatch(appActions.setAppStatus({ status: "succeeded" }))
            return { todolists }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (_, action) => {
            return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" }))
          },
        },
      ),
      addTodolist: createAThunk<string, { todolist: TodolistType }>(
        async (title, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }))
            const res = await todolistsAPI.createTodolist(title)
            const todolist = res.data.data.item
            dispatch(appActions.setAppStatus({ status: "succeeded" }))
            return { todolist }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
          },
        },
      ),
      deleteTodolist: createAThunk<string, any>(
        async (todolistId, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }))
            dispatch(
              todolistsActions.changeTodolistEntityStatus({ todolistId: todolistId, newEntityStatus: "loading" }),
            )

            const res = await todolistsAPI.deleteTodolist(todolistId)
            if (res.data.resultCode === ResultCode.Succeeded) {
              dispatch(appActions.setAppStatus({ status: "succeeded" }))
              return { todolistId }
            } else {
              handleServerAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: todolistId, newEntityStatus: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),
      changeTodolistTitle: createAThunk<{ todolistId: string; title: string }, { todolistId: string; title: string }>(
        async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }))

            await todolistsAPI.changeTodolistTitle(todolistId, title)
            dispatch(appActions.setAppStatus({ status: "succeeded" }))
            return { todolistId, title }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),

      changeTodolistFilter: creators.reducer(
        (
          state,
          action: PayloadAction<{
            todolistId: string
            newFilter: FilterType
          }>,
        ) => {
          const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
          if (todolist) {
            todolist.filter = action.payload.newFilter
          }
        },
      ),
      changeTodolistEntityStatus: creators.reducer(
        (
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
      ),
    }
  },
  extraReducers: (builder) => {
    builder.addCase(clearData, () => {
      return []
    })
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
