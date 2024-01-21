import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { AppRootStateType } from "app/store"

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
