import { Dispatch } from "redux"
import { appActions } from "app/appSlice"
import { ResponseType } from "common/types/types"

//todo изменить на AppDispatch
export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: "Обратитесь в службу поддержки." }))
  }
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
