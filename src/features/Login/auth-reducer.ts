import { AuthAPI } from "api/todolist-api"
import { LoginType } from "./Login"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ResultCode } from "app/enums"
import { AppThunk } from "app/types"
import { appActions } from "app/app-reducer"
import { todolistsActions } from "features/TodolistList/Todolist/todolists-reducer"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks
export const loginTC =
  (data: LoginType): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))

    try {
      const response = await AuthAPI.login(data)
      if (response.data.resultCode === ResultCode.Succeeded) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))

        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(dispatch, response.data)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, (error as Error).message)
    }
  }
export const meTC = (): AppThunk => async (dispatch) => {
  // dispatch(setAppStatusAC("loading"))

  try {
    const response = await AuthAPI.me()
    if (response.data.resultCode === ResultCode.Succeeded) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      // dispatch(setAppStatusAC("succeeded"))
    } else {
      handleServerAppError(dispatch, response.data)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, (error as Error).message)
  } finally {
    dispatch(appActions.setIsInitialized({ isInitialized: true }))
  }
}
export const logOutTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await AuthAPI.logOut()
    if (response.data.resultCode === ResultCode.Succeeded) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))

      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      dispatch(todolistsActions.clearData())
    } else {
      handleServerAppError(dispatch, response.data)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, (error as Error).message)
  }
}
