import * as React from 'react'
import {useState, ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {generateId} from '../../common/utils';
import {addToDo, todoInterface} from '../../store/todos/todosReducer';

interface Props {
}

export const TodoForm: React.FC = (props: Props) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(''),
        [text, setText] = useState('')

    const onChange = (set: React.Dispatch<React.SetStateAction<string>>) =>
        ({target: {value}}: ChangeEvent<HTMLInputElement>) => value.trim().length && set(value)

    const onCreateTodo = () => {
        const data: todoInterface = {
            id: generateId(),
            completed: false,
            title: title,
            text: text
        }
        dispatch(addToDo(data))
    }

    return (
        <div className={'todo__form'}>
            <input type="text" value={title} onChange={onChange(setTitle)} placeholder={'Заголовок'}/>
            <input type="text" value={text} onChange={onChange(setText)} placeholder={'Описание'}/>
            <button onClick={onCreateTodo}>Добавить задачу</button>
        </div>
    )
}

TodoForm.defaultProps = {}
