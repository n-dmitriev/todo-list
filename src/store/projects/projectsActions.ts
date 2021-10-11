import {createAsyncThunk} from "@reduxjs/toolkit"
import {dataBase} from '../../firebase/firebase'
import {addDoc, collection, doc, getDocs, query, updateDoc} from "firebase/firestore"
import {IProject} from "../../models/IProject"
import {addProject, setProjects} from "./projectsReducer"
import {setActiveProject} from "../todoProject/todoReducer"
import {ITodo} from "../../models/ITodo";

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (projectName: string, {rejectWithValue, dispatch, getState}) => {
        try {
            const state: any = getState(), userId = state.auth.user?.id
            if (userId) {
                const project: IProject = {projectName, todosList: [], id: '', userId}
                const docRef = await addDoc(collection(dataBase, "projects"), project)
                project.id = docRef.id
                await updateDoc(doc(dataBase, "projects", docRef.id), {...project})
                dispatch(addProject(project))
                dispatch(setActiveProject(project))
            }
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const getProjects = createAsyncThunk(
    'projects/getProjects',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const docRef = query(collection(dataBase, "projects"))
            const docSnap = await getDocs(docRef)
            const projects: IProject[] = []
            docSnap.forEach((doc) => {
                const project = doc.data()
                project.todosList = project.todosList.map((todo: ITodo) => todo)
                projects.push(project as IProject)
            })
            dispatch(setProjects(projects))
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.errorMessage)
        }
    }
)




