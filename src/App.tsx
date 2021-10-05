import React from 'react'
import './app.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import {TodoController} from './containers/TodoController/TodoController'

const App = () => {
    return (
        <div className="app">
            <TodoController/>
        </div>
    )
}

export default App
