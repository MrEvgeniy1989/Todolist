import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatusType } from "common/types/types"
import { authThunks } from "features/auth/model/authSlice"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import { tasksThunks } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/model/tasksSlice"

const slice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle" as RequestStatusType,
    error: null as null | string,
  },
  reducers: {
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed"
        if (action.payload) {
          if (
            action.type === todolistsActions.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.me.rejected.type
          )
            return

          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : `Some error occurred`
        }
      })
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
