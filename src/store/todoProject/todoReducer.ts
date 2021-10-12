import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {interfaceState} from "./types"
import {ITodo} from "../../models/ITodo";
import {IProject} from "../../models/IProject";

const initialState: interfaceState = {
    activeProject: null,
    editableTodo: null,
    isLoading: false,
    error: null
}

function foo<K extends string>(val: { [key in K]: any }, key: K, value: any) {
    val[key] = value
}

const slice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setActiveProject: (state, action: PayloadAction<IProject>) => {
            state.activeProject = action.payload
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.activeProject?.todosList.push(action.payload)
        },
        setEditableTodo: (state, action: PayloadAction<ITodo>) => {
            state.editableTodo = action.payload
        },
        editTodo: (state, action) => {
            const {id, name, value} = action.payload
            const list: ITodo[] = state.activeProject?.todosList || []
            const todo = list.find(todo => todo.id === id)
            todo && foo(todo, name, value)
        },
        onDelete: (state, action: PayloadAction<string>) => {
            const activeProject = state.activeProject as IProject,
                todoList = state.activeProject?.todosList || []
            activeProject.todosList = todoList.filter(todo => todo.id !== action.payload)
            state.activeProject = activeProject
        },
        resetTodo: () => initialState

    },
    extraReducers: {}
})

export const {setActiveProject, setEditableTodo, resetTodo, addTodo, editTodo} = slice.actions
export default slice.reducer
