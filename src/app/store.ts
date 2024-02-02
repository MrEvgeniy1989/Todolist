import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"
import { todolistsReducer } from "features/todolistList/model/todolistsSlice"
import { tasksReducer } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/model/tasksSlice"

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
  },
})
