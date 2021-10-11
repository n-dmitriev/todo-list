import {createAsyncThunk} from "@reduxjs/toolkit"
import {authWithFirebase, dataBase} from '../../firebase/firebase'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged, signOut, User
} from "firebase/auth"
import {IUser} from "../../models/IUser"
import {setUserData} from "./authReducer"

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
            await signOut(authWithFirebase)
            dispatch(setUserData({userData: null, isAuth: false}))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)
