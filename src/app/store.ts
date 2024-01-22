import { tasksReducer } from "features/TodolistList/Todolist/Task/tasks-reducer"
import { todolistsReducer } from "features/TodolistList/Todolist/todolists-reducer"
import { appReducer } from "app/app-reducer"
import { authReducer } from "features/Login/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

export type AppRootStateType = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
  },
})
