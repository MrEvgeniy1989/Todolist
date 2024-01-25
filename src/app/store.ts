import { tasksReducer } from "features/todolistList/todolist/task/model/tasksSlice"
import { todolistsReducer } from "features/todolistList/model/todolistsSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"
import { AnyAction } from "redux"

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export const store = configureStore({
  reducer: {
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
  },
})
