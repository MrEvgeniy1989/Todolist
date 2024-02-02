import { appActions } from "app/appSlice"
import { BaseResponseType } from "common/types/types"
import { Dispatch } from "redux"

/**
 * Handling an error received from the server.
 *
 * @template D Data type of the returned response from the server.
 * @param {Dispatch} dispatch Redux dispatcher function to dispatch actions.
 * @param {BaseResponseType<D>} data A response from the server containing data and error messages.
 * @param {boolean} showGlobalError Flag that determines whether to show a global error message. Defaults to true.
 * @returns {void}
 */

export const handleServerAppError = <D>(
  dispatch: Dispatch,
  data: BaseResponseType<D>,
  showGlobalError: boolean = true,
): void => {
  if (showGlobalError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  }
}
