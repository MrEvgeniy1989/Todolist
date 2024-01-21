import React, { FC, memo } from "react"
import Button, { ButtonProps } from "@mui/material/Button"

// type PropsType = {
//     title: string
//     myVariant: 'text' | 'outlined' | 'contained'
//     myColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
//     callback: () => void
// }

interface PropsType extends ButtonProps {}

export const MyButton: FC<PropsType> = memo(({ title, variant, color, onClick }) => {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      {title}
    </Button>
  )
})
