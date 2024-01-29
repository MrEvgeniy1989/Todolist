import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice } from "@reduxjs/toolkit"
import { ResultCode } from "common/enums/enums"
import { appActions } from "app/appSlice"
import { clearData } from "common/actions/commonActions"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { AuthAPI } from "features/auth/api/authApi"
import { LoginType } from "features/auth/api/authApi.types"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(
  `${slice.name}/login`,
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const response = await AuthAPI.login(data)
      if (response.data.resultCode === ResultCode.Succeeded) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { isLoggedIn: true }
      } else {
        const isShowGlobalError = !response.data.fieldsErrors.length
        handleServerAppError(dispatch, response.data, isShowGlobalError)
        return rejectWithValue(response.data)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const response = await AuthAPI.logout()
      if (response.data.resultCode === ResultCode.Succeeded) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(clearData())
        return { isLoggedIn: false }
      } else {
        handleServerAppError(dispatch, response.data)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/me`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthAPI.me()
      if (response.data.resultCode === ResultCode.Succeeded) {
        return { isLoggedIn: true }
      } else {
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setIsInitialized({ isInitialized: true }))
    }
  },
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, me }
