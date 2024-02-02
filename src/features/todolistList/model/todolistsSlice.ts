import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "app/store"
import { clearData } from "common/actions/commonActions"
import { ResultCode } from "common/enums/enums"
import { BaseResponseType, RequestStatusType } from "common/types/types"
import { todolistsAPI } from "features/todolistList/api/todolistsApi"
import { FilterType, TodolistType } from "features/todolistList/api/todolistsApi.types"
import { tasksThunks } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/model/tasksSlice"

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
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null | BaseResponseType }>()
    return {
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

      //Thunks
      fetchTodolists: createAThunk<undefined, { todolists: TodolistType[] }>(
        async (_, { dispatch }) => {
          const res = await todolistsAPI.getTodolists()
          res.data.forEach((todolist) => {
            ;(dispatch as AppDispatch)(tasksThunks.fetchTasks(todolist.id))
          })
          return { todolists: res.data }
        },
        {
          fulfilled: (_, action) => {
            return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" }))
          },
        },
      ),
      addTodolist: createAThunk<string, { todolist: TodolistType }>(
        async (title, { rejectWithValue }) => {
          const res = await todolistsAPI.createTodolist(title)
          if (res.data.resultCode === ResultCode.Succeeded) {
            return { todolist: res.data.data.item }
          } else {
            return rejectWithValue(res.data)
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
          },
        },
      ),
      deleteTodolist: createAThunk<{ todolistId: string }, { todolistId: string }>(
        async ({ todolistId }, { dispatch, rejectWithValue }) => {
          dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: todolistId, newEntityStatus: "loading" }))
          const res = await todolistsAPI.deleteTodolist(todolistId).finally(() => {
            dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: todolistId, newEntityStatus: "idle" }))
          })
          if (res.data.resultCode === ResultCode.Succeeded) {
            return { todolistId }
          } else {
            return rejectWithValue(res.data)
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
        async ({ todolistId, title }, _) => {
          await todolistsAPI.changeTodolistTitle(todolistId, title)
          return { todolistId, title }
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
