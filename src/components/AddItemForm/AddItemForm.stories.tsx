import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";


const meta: Meta<typeof AddItemForm> = {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            description: 'Clicked Button inside form',
            action: 'clicked'
        }
    },
}

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};


const AddItemFormWithError: FC<AddItemFormPropsType> = ({callback}) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('Название не может быть пустым!')

    const onChangeNewTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
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

export const AddItemFormWithErrorStory: Story = {
    render: (args) => <AddItemFormWithError {...args}/>
}
// export const AddItemFormWithErrorStory: Story = {
//     render: () => <AddItemFormWithError callback={() => action ('Clicked Button inside form')}/>
// }
