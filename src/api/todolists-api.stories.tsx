import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "./todolist-api";

export default {
    title: 'API/Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.getTodolists()
            .then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const title = 'REACT'
        todolistsAPI.createTodolist(title)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = `4c907e01-e763-4ee0-a5d8-fad75f091070`;
        todolistsAPI.deleteTodolist(todoListId)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todoListId = `04b9b391-cb35-413b-bdfd-4bbb486e9dbf`;
        const title = 'New Title'
        todolistsAPI.changeTodolistTitle(todoListId, title)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

