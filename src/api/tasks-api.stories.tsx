import React, {useEffect, useState} from 'react'
import {TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskModelType} from "./todolist-api";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'aadf36b6-d40e-4b49-8c96-2af60e3769fb'
        tasksAPI.getTasks(todolistId)
            .then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = 'aadf36b6-d40e-4b49-8c96-2af60e3769fb'
        const title = 'REACT'
        tasksAPI.createTask(todoListId, title)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = `aadf36b6-d40e-4b49-8c96-2af60e3769fb`;
        const taskId = `8755ec14-9565-44bd-b9aa-899f9f47e99b`;
        tasksAPI.deleteTask(todoListId, taskId)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todoListId = `aadf36b6-d40e-4b49-8c96-2af60e3769fb`;
        const taskId = `db5d160e-6b7b-4570-ad91-2077f700de9f`;

        const model: UpdateTaskModelType = {
            title: 'New Title',
            description: '',
            startDate: '',
            priority: TaskPriorities.Low,
            deadline: '',
            status: TaskStatuses.New
        }

        tasksAPI.updateTask(todoListId, taskId, model)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

