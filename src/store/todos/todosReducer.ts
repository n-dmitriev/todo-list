import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface todoInterface {
    id: string,
    completed: boolean,
    title: string,
    text: string
}

interface interfaceState {
    todoList: todoInterface[];
    activeTodo: todoInterface | null
}

const initialState: interfaceState = {
    todoList: [],
    activeTodo: null
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<todoInterface>) => {
            state.todoList.push(action.payload)
        }
    }
})

export const {addToDo} = todoSlice.actions
export default todoSlice.reducer
