import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./reducers/tasksReducer";
import {todolistsReducer} from "./reducers/todolistsReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store