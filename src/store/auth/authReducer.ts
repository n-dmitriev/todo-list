import {createSlice} from "@reduxjs/toolkit";
import {interfaceState} from "./types";
import {setRejected} from "../../common/utils";

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
        const {authorization} = await require('./authActions')

        builder.addCase(authorization.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(authorization.fulfilled, (state) => {
            state.isLoading = false
            state.isAuth = true
        })
        builder.addCase(authorization.rejected, (state, action: any) => setRejected(state, action))
    }
})

export const {setUserData, resetAuth} = authSlice.actions
export default authSlice.reducer
