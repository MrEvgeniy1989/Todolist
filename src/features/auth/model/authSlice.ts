import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ResultCode } from "common/enums/enums"
import { appActions } from "app/appSlice"
import { clearData } from "common/actions/commonActions"
import { AppThunk } from "app/store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { AuthAPI } from "features/auth/api/authApi"
import { LoginType } from "features/auth/api/authApi.types"

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
      handleServerNetworkError(dispatch, error as Error)
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
    handleServerNetworkError(dispatch, error as Error)
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
      dispatch(clearData())
    } else {
      handleServerAppError(dispatch, response.data)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error as Error)
  }
}
