import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@mui/material/TextField'

type PropsType = {
    className: string
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan: FC<PropsType> = ({className, title, callback}) => {
    const [edit, setEdit] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState(title)

    const onChangeNewTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value)
    const editHandler = () => {
        setEdit(!edit)
        if (edit) updateTask()
    };
    const updateTask = () => callback(newTaskTitle)
    return (
        edit
            ? <TextField variant="standard" value={newTaskTitle} onChange={onChangeNewTaskTitleHandler}
                         onBlur={editHandler} autoFocus/>
            : <span className={className} onDoubleClick={editHandler}>{title}</span>
    )
}