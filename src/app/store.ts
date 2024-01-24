import { tasksReducer } from "features/todolistList/todolist/task/model/tasks-reducer"
import { todolistsReducer } from "features/todolistList/model/todolistsReducer"
import { appReducer } from "app/app-reducer"
import { authReducer } from "features/auth/model/authReducer"
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
