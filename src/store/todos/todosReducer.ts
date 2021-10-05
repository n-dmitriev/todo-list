import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface todo {
    id: string,
    completed: boolean,
    title: string,
    text: string
}

interface interfaceState {
    todoList: todo[];
    activeTodo: todo | null
}

const initialState: interfaceState = {
    todoList: [],
    activeTodo: null
}

const arraySlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<todo>) => {
            state.todoList.push(action.payload)
        }
    }
})

export const {addToDo} = arraySlice.actions
export default arraySlice.reducer
