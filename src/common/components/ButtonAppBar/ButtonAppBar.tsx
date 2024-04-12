import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorIsLoggedIn } from "features/auth/model/authSelectors"
import { authThunks } from "features/auth/model/authSlice"

import s from "./buttonAppBar.module.css"

export default function ButtonAppBar() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectorIsLoggedIn)

  const onClickHandler = () => {
    dispatch(authThunks.logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container fixed className={s.container}>
          <Toolbar className={s.toolbar}>
            {isLoggedIn && (
              <Button color="inherit" onClick={onClickHandler}>
                logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
