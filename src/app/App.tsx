import React, { useEffect } from "react"
import "app/App.css"
import ButtonAppBar from "common/components/ButtonAppBar/ButtonAppBar"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import { TodolistList } from "features/todolistList/ui/TodolistList/TodolistList"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Login } from "features/auth/ui/Login/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { RequestStatusType } from "common/types/types"
import { selectIsInitialized, selectStatus } from "app/appSelectors"
import { authThunks } from "features/auth/model/authSlice"

export const App = () => {
  const status = useAppSelector<RequestStatusType>(selectStatus)
  const isInitialized = useAppSelector<boolean>(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.me())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      {status === "loading" && <LinearProgress color="secondary" />}
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistList />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/404"} element={<h1 style={{ textAlign: "center" }}>Page not found 404</h1>} />
          <Route path={"*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  )
}
