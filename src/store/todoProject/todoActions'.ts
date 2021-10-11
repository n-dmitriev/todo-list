import {createAsyncThunk} from "@reduxjs/toolkit"
import projects from "../projects/projectsReducer"
import {addDoc, collection, doc, updateDoc} from "firebase/firestore"
import {dataBase} from "../../firebase/firebase"
import {ITodo} from "../../models/ITodo"
import {generateId} from "../../common/utils";
import {addTodo, setActiveProject} from "./todoReducer"


export const createTodo = createAsyncThunk(
    'reducer/action',
    async ({title, text}: any, {rejectWithValue, dispatch, getState}) => {
        try {
            const todo: ITodo = {id: generateId(), completed: false, title, text}
            dispatch(addTodo(todo))
            const state: any = getState(), project = state.todo.activeProject
            if (project) {
                await updateDoc(doc(dataBase, "projects", project?.id), {todosList: project.todosList})
                dispatch(setActiveProject(project))
            }
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)
