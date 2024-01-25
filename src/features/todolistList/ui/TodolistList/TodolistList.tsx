import React, { FC, useCallback, useEffect } from "react"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { Todolist } from "features/todolistList/todolist/ui/Todolist/Todolist"
import { TodolistDomainType, todolistsActions } from "features/todolistList/model/todolistsSlice"
import { Navigate } from "react-router-dom"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorTodolists } from "features/todolistList/model/todolistsSelectors"
import { selectorIsLoggedIn } from "features/auth/model/authSelectors"

type PropsType = {}

export const TodolistList: FC<PropsType> = () => {
  let todolists = useAppSelector<TodolistDomainType[]>(selectorTodolists)
  const isLoggedIn = useAppSelector(selectorIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todolistsActions.fetchTodolists())
  }, [dispatch, isLoggedIn])

  const addTodolist = useCallback(
    (newTodolistTitle: string) => dispatch(todolistsActions.addTodolist(newTodolistTitle)),
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <div>
      <Grid container style={{ margin: "20px" }}>
        <AddItemForm callback={addTodolist} />
      </Grid>

      <Grid container>
        {todolists.map((todolist) => {
          return (
            <Grid item style={{ margin: "20px" }} key={todolist.id}>
              <Paper elevation={24} style={{ padding: "20px" }}>
                <Todolist
                  todolistId={todolist.id}
                  todoTitle={todolist.title}
                  filter={todolist.filter}
                  entityStatus={todolist.entityStatus}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
