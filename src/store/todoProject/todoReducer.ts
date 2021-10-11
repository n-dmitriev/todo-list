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

const slice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<ITodo>) => {
            state.activeProject?.todosList.push(action.payload)
        },
        setActiveProject: (state, action: PayloadAction<IProject>) => {
            state.activeProject = action.payload
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.activeProject?.todosList.push(action.payload)
        },
        setActiveTodo: (state, action: PayloadAction<ITodo>) => {

        }
    },
    extraReducers: {}
})

export const {addToDo, setActiveProject, setActiveTodo, addTodo} = slice.actions
export default slice.reducer
