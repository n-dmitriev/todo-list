import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {interfaceState} from "./types"
import {IProject} from "../../models/IProject"
import {ITodo} from "../../models/ITodo";

const initialState: interfaceState = {
    projectList: [],
    isLoading: false,
    error: null
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<IProject>) => {
            state.projectList.push(action.payload)
        },
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.projectList = action.payload
        },
        resetProjects: () => initialState
    }
})

export const {setProjects, addProject, resetProjects} = projectSlice.actions
export default projectSlice.reducer


