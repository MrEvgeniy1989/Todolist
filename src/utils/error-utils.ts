import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { Dispatch } from "redux"
import { ResponseType } from "../api/todolist-api"

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC("Обратитесь в службу поддержки."))
  }
  dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (dispatch: Dispatch, errorMessage: string) => {
  dispatch(setAppErrorAC(errorMessage))
  dispatch(setAppStatusAC("failed"))
}
