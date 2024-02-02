import { AppRootStateType } from "app/store"

export const selectorIsLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn
