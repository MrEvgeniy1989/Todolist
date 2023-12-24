import {AnyAction, applyMiddleware, combineReducers, legacy_createStore, Middleware} from "redux";
import {tasksReducer} from "./reducers/tasksReducer";
import {todolistsReducer} from "./reducers/todolistsReducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector