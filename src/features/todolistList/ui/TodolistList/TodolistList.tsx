import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorIsLoggedIn } from "features/auth/model/authSelectors"
import { selectorTodolists } from "features/todolistList/model/todolistsSelectors"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import { Todolist } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/Todolist"
import React, { useCallback, useEffect } from "react"
import { Navigate } from "react-router-dom"

export const TodolistList = () => {
  let todolists = useAppSelector(selectorTodolists)
  const isLoggedIn = useAppSelector(selectorIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todolistsActions.fetchTodolists())
  }, [dispatch, isLoggedIn])

  const addTodolistHandler = useCallback(
    (newTodolistTitle: string) => {
      return dispatch(todolistsActions.addTodolist(newTodolistTitle)).unwrap()
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <div>
      <Grid container style={{ margin: "20px" }}>
        <AddItemForm callback={addTodolistHandler} />
      </Grid>

      <Grid container>
        {todolists.map((todolist) => {
          return (
            <Grid item style={{ margin: "20px" }} key={todolist.id}>
              <Paper elevation={24} style={{ padding: "20px" }}>
                <Todolist
                  todolistId={todolist.id}
                  todolistTitle={todolist.title}
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
