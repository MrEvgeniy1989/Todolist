import React, { ChangeEvent, KeyboardEvent, FocusEvent, FC, memo, useState } from "react"
import TextField from "@mui/material/TextField"

type PropsType = {
  className: string
  title: string
  callback: (newTitle: string) => void
}

export const EditableSpan: FC<PropsType> = memo(({ className, title, callback }) => {
  const [edit, setEdit] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState(title)

  const onChangeNewTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(event.currentTarget.value)
  const editHandler = () => {
    if (edit) {
      if (newTaskTitle !== title) {
        callback(newTaskTitle)
      }
    }
    setEdit(!edit)
  }
  const onKeyDownChangeEditHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      editHandler()
    }
    if (e.key === "Escape") {
      setNewTaskTitle(title)
      setEdit(!edit)
    }
  }
  const onFocusChangeEditHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.select()
  }

  return edit ? (
    <TextField
      variant="standard"
      value={newTaskTitle}
      onChange={onChangeNewTaskTitleHandler}
      onBlur={editHandler}
      onKeyDown={onKeyDownChangeEditHandler}
      onFocus={onFocusChangeEditHandler}
      autoFocus
    />
  ) : (
    <span className={className} onDoubleClick={editHandler}>
      {title}
    </span>
  )
})
