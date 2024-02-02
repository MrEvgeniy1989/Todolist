import Delete from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { RequestStatusType } from "common/types/types"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import s from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/TodolistTitle/TodolistTitle.module.css"

type Props = {
  todolistId: string
  todolistTitle: string
  entityStatus: RequestStatusType
}

export const TodolistTitle = ({ todolistId, todolistTitle, entityStatus }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => dispatch(todolistsActions.deleteTodolist({ todolistId }))
  const changeTodolistTitleHandler = (title: string) =>
    dispatch(
      todolistsActions.changeTodolistTitle({
        todolistId,
        title,
      }),
    )

  return (
    <div className={s.todolistTitle}>
      <EditableSpan className={s.editableSpan} title={todolistTitle} callback={changeTodolistTitleHandler} />
      <IconButton aria-label="delete" onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </div>
  )
}
