import { useDispatch } from "react-redux"
import { AppDispatchType } from "app/types"

// export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppDispatch = useDispatch<AppDispatchType>
