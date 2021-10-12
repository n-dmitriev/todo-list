import {createAsyncThunk} from "@reduxjs/toolkit"
import {authWithFirebase} from '../../firebase/firebase'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged, signOut, User
} from "firebase/auth"
import {IUser} from "../../models/IUser"
import {resetAuth, setUserData} from "./authReducer"
import {resetTodo} from "../todoProject/todoReducer"
import {resetProjects} from "../projects/projectsReducer"

const authChanged = (dispatch: any) => {
    const callback = onAuthStateChanged(authWithFirebase, (user: User | null) => {
        if (user) {
            const userData: IUser = {
                id: user.uid,
                login: user.email as string
            }
            dispatch(setUserData({userData, isAuth: true}))
        }
    })
    callback()
}

export const authorization = createAsyncThunk(
    'auth/authorization',
    async ({email, password}: any, {rejectWithValue, dispatch}) => {
        try {
            await signInWithEmailAndPassword(authWithFirebase, email, password)
            authChanged(dispatch)
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const checkForAuthorize = createAsyncThunk(
    'auth/checkForAuthorize',
    (_, {rejectWithValue, dispatch}) => {
        try {
            authChanged(dispatch)
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/checkForAuthorize',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(resetAuth())
            dispatch(resetTodo())
            dispatch(resetProjects())
            await signOut(authWithFirebase)
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)


