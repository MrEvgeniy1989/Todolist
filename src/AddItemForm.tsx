import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
    callback: (netTaskTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = ({callback}) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    const onChangeNewTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError('')
        setNewTaskTitle(event.currentTarget.value)
    };

    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim()) {
            callback(newTaskTitle.trim())
        } else setError('Название не может быть пустым!')
        setNewTaskTitle('')
    };

    const onKeyDownAddItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickAddTaskHandler()
        }
    };

    const stylesButton = {maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', marginLeft: '10px'}

    return (
        <div>
            <TextField variant="outlined"
                       label={error ? error : 'Введите название...'}
                       size={'small'}
                       error={!!error}
                       value={newTaskTitle}
                       onChange={onChangeNewTaskTitleHandler}
                       onKeyDown={onKeyDownAddItemHandler}/>
            <Button variant={'contained'} color={'primary'} onClick={onClickAddTaskHandler} disabled={!newTaskTitle}
                    style={stylesButton}>+</Button>
        </div>
    )
}