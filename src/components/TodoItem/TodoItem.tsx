import * as React from 'react'
import {todoInterface} from '../../store/todos/todosReducer'

interface Props {
    data: todoInterface | null
}

export const TodoItem: React.FC<Props> = ({data}: Props) => {

    return (
        <div className={'todo__item'}>
            {data?.title}
        </div>
    )
}

TodoItem.defaultProps = {
    data: null
}
