import {createAsyncThunk} from "@reduxjs/toolkit"
import {doc, updateDoc} from "firebase/firestore"
import {dataBase} from "../../firebase/firebase"
import {ITodo} from "../../models/ITodo"
import {generateId} from "../../common/utils";
import {addTodo, editProject} from "./todoReducer"
import { updateProjectsList } from "../projects/projectsReducer";


export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async ({title, text}: any, {rejectWithValue, dispatch, getState}) => {
        try {
            const todo: ITodo = {id: generateId(), completed: false, title, text}
            dispatch(addTodo(todo))
            const state: any = getState(), project = state.todo.activeProject
            await updateDoc(doc(dataBase, "projects", project?.id), {todosList: project.todosList})
            dispatch(updateProjectsList(project))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const editProjectName = createAsyncThunk(
    'todo/editProject',
    async (projectName: string, {rejectWithValue, dispatch, getState}) => {
        try {
            dispatch(editProject(projectName))
            const state: any = getState(), project = state.todo.activeProject
            await updateDoc(doc(dataBase, "projects", project?.id), {projectName})
            dispatch(updateProjectsList(project))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)
