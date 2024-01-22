import { Dispatch } from "redux"
import { ResponseType } from "app/types"
import { appActions } from "app/app-reducer"

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: "Обратитесь в службу поддержки." }))
  }
  dispatch(appActions.setAppStatus({ status: "failed" }))
}

export const handleServerNetworkError = (dispatch: Dispatch, errorMessage: string) => {
  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
