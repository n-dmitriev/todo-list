import * as React from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {todoInterface} from '../../store/todos/todosReducer';
import {TodoItem} from '../TodoItem/TodoItem'

interface Props {
}

export const TodoList: React.FC = (props: Props) => {
    const {todoList} = useSelector((state: RootState) => state.todo)

    return (
        <div className={'todo__list'}>
            {todoList.map((item: todoInterface) => <TodoItem key={item.id} data={item}/>)}
        </div>
    )
}

TodoList.defaultProps = {}
