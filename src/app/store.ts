import { tasksReducer } from "features/todolistList/todolist/task/model/tasksSlice"
import { todolistsReducer } from "features/todolistList/model/todolistsSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

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
