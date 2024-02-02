import Checkbox from "@mui/material/Checkbox"
import { TaskStatuses } from "common/enums/enums"
import { ChangeEvent } from "react"

type Props = {
  checked: boolean
  callback: (value: TaskStatuses) => void
}

export const CheckBox = ({ callback, checked }: Props) => {
  const onChangeCallbackHandler = (event: ChangeEvent<HTMLInputElement>) => {
    callback(event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
  }

  return <Checkbox checked={checked} onChange={onChangeCallbackHandler} />
}
