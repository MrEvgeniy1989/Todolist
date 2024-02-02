import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "app/appSlice"
import { clearData } from "common/actions/commonActions"
import { ResultCode } from "common/enums/enums"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { AuthAPI } from "features/auth/api/authApi"
import { LoginType } from "features/auth/api/authApi.types"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.me.fulfilled),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },
})

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(
  `${slice.name}/login`,
  async (data, { rejectWithValue }) => {
    const response = await AuthAPI.login(data)
    if (response.data.resultCode === ResultCode.Succeeded) {
      return { isLoggedIn: true }
    } else {
      // const isShowGlobalError = !response.data.fieldsErrors.length
      // handleServerAppError(dispatch, response.data, isShowGlobalError)
      return rejectWithValue(response.data)
    }
  },
)
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await AuthAPI.logout()
    if (res.data.resultCode === ResultCode.Succeeded) {
      dispatch(clearData())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/me`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await AuthAPI.me().finally(() => {
      dispatch(appActions.setIsInitialized({ isInitialized: true }))
    })
    if (res.data.resultCode === ResultCode.Succeeded) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, me }
