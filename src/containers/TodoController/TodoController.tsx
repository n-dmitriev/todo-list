import * as React from 'react'
import {TodoList} from '../../components/TodoList/TodoList'
import { TodoForm } from '../../components/TodoForm/TodoForm';

interface Props {
}

export const TodoController: React.FC = (props: Props) => {
    return (
        <div className={'todo'}>
            <TodoForm/>
            <TodoList/>
        </div>
    )
}

TodoController.defaultProps = {}
