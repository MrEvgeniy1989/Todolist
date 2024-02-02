import { memo } from "react"
import Button, { ButtonProps } from "@mui/material/Button"

// type Props = {
//     title: string
//     myVariant: 'text' | 'outlined' | 'contained'
//     myColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
//     callback: () => void
// }

interface Props extends ButtonProps {}

export const MyButton = memo(({ title, variant, color, onClick }: Props) => {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      {title}
    </Button>
  )
})
