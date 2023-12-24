import React, {ChangeEvent, FC} from 'react';
import Checkbox from "@mui/material/Checkbox"
import {TaskStatuses} from "../api/todolist-api";

type PropsType = {
    checked: boolean
    callback: (value: TaskStatuses) => void
}

export const CheckBox: FC<PropsType> = ({callback, checked}) => {

    const onChangeCallbackHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callback(event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }

    return (
        <Checkbox checked={checked} onChange={onChangeCallbackHandler}/>
    );
}