import { AppRootStateType } from "app/store"
import { TodolistDomainType } from "features/todolistList/model/todolistsSlice"

export const selectorTodolists = (state: AppRootStateType): TodolistDomainType[] => state.todolists
