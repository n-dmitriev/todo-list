import {combineReducers, configureStore} from '@reduxjs/toolkit'
import todo from './todos/todosReducer'

const rootReducer = combineReducers({
    todo
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
})
