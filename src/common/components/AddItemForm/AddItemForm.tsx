import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { BaseResponseType } from "common/types/types"
import { ChangeEvent, KeyboardEvent, memo, useState } from "react"

export type Props = {
  callback: (newTitle: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm = memo(({ callback, disabled }: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>("")

  const newTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(null)
    setNewTaskTitle(event.currentTarget.value)
  }

  const addItemHandler = () => {
    if (newTaskTitle.trim()) {
      callback(newTaskTitle.trim())
        .then(() => {
          setNewTaskTitle("")
        })
        .catch((err: BaseResponseType) => {
          if (err.resultCode) {
            setError(err.messages[0])
          }
        })
    } else setError("Title is required!")
  }

  const onKeyDownAddItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItemHandler()
    }
  }
  const errorResetHandler = () => {
    setError("")
  }

  const stylesButton = { maxWidth: "40px", maxHeight: "40px", minWidth: "40px", minHeight: "40px", marginLeft: "10px" }

  return (
    <div>
      <TextField
        variant="outlined"
        label={"Enter title..."}
        size={"small"}
        error={!!error}
        helperText={<span style={{ display: "block", maxWidth: `190px` }}>{error}</span>}
        value={newTaskTitle}
        onChange={newTaskTitleHandler}
        onKeyDown={onKeyDownAddItemHandler}
        onFocus={errorResetHandler}
        disabled={disabled}
      />
      <Button variant={"contained"} color={"primary"} onClick={addItemHandler} disabled={disabled} style={stylesButton}>
        +
      </Button>
    </div>
  )
})
