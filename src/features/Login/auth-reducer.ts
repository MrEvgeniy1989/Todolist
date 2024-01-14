import {Dispatch} from 'redux'
import {
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusType,
    setIsInitializedAC
} from "../../store/reducers/app-reducer";
import {AuthAPI} from "../../api/todolist-api";
import {LoginType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodolistsDataAC} from "../../store/reducers/todolists-reducer";

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusType | SetAppErrorACType
type ErrorType = { message: string }
type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await AuthAPI.login(data)
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, (error as ErrorType).message)
    }
}
export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await AuthAPI.me()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, (error as ErrorType).message)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}
export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await AuthAPI.logOut()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(clearTodolistsDataAC())
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, (error as ErrorType).message)
    }
}


