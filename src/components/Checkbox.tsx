import React, {ChangeEvent, FC} from 'react';
import Checkbox from "@mui/material/Checkbox"

type PropsType = {
    checked: boolean
    callback: (value: boolean) => void
}

export const CheckBox: FC<PropsType> = ({callback, checked}) => {

    const onChangeCallbackHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callback(event.currentTarget.checked)
    }

    return (
        <Checkbox checked={checked} onChange={onChangeCallbackHandler}/>
    );
}