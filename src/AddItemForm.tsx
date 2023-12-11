import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';

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
        } else setError('Название задания не может быть пустым!')
        setNewTaskTitle('')
    };

    const onKeyDownAddItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickAddTaskHandler()
        }
    };
    return (
        <div>
            <input
                className={error ? "input-error" : ''}
                value={newTaskTitle}
                onChange={onChangeNewTaskTitleHandler}
                onKeyDown={onKeyDownAddItemHandler}
            />
            <button onClick={onClickAddTaskHandler} disabled={!newTaskTitle}>+</button>
            {error && <div className={error ? "error-message" : ''}>{error}</div>}
        </div>
    )
}