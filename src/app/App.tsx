import React, { useEffect } from "react"
import "app/App.css"
import ButtonAppBar from "components/ButtonAppBar/ButtonAppBar"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import { TodolistList } from "features/TodolistList/TodolistList"
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar"
import { Login } from "features/Login/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import { meTC } from "features/Login/auth-reducer"
import CircularProgress from "@mui/material/CircularProgress"
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import { RequestStatusType } from "app/types"

export const App = () => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
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
