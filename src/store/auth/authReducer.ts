import {createSlice} from "@reduxjs/toolkit"
import {defaultFulfilled, defaultPending, defaultRejected} from "../../common/utils"
import {IUser} from "../../models/IUser"
//import {signIn, signUp} from "./authActions"

export interface interfaceState {
    user: IUser | null,
    isAuth: boolean,
    isLoading: boolean,
    error: string | null
}

const initialState: interfaceState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload.userData
            state.isAuth = action.payload.isAuth
            state.isLoading = false
            state.error = null
        },
        resetAuth: () => initialState
    },
    extraReducers: async (builder) => {
        console.log(builder)
        const {signIn, signUp} = await require('./authActions')
        // console.log(signIn, signUp)
        builder.addCase(signIn.pending, (state) => defaultPending(state))
        builder.addCase(signIn.fulfilled, (state) => defaultFulfilled(state))
        builder.addCase(signIn.rejected, (state, action: any) => defaultRejected(state, action))
        builder.addCase(signUp.pending, (state) => defaultPending(state))
        builder.addCase(signUp.fulfilled, (state) => defaultFulfilled(state))
        builder.addCase(signUp.rejected, (state, action: any) => defaultRejected(state, action))
    }
})

export const {setUserData, resetAuth} = authSlice.actions
export default authSlice.reducer
