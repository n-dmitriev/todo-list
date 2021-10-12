import * as React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {List, Checkbox} from 'antd';
import {EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import {ITodo} from "../../models/ITodo";
import { editTodo } from '../../store/todoProject/todoReducer';

interface Props {
}

export const TodoList: React.FC = (props: Props) => {
    const {activeProject} = useSelector((state: RootState) => state.todo)
    const dispatch = useDispatch()

    const onChange = (id: string) => (e: any) => {
        dispatch(editTodo({name: e.target.name, value: e.target.value || e.target.checked, id}))
    }

    return (
        <div className={'todo__list'}>
            <List
                dataSource={activeProject?.todosList || []}
                renderItem={(todo: ITodo) =>
                    <List.Item
                        key={todo.id}
                        actions={[
                            <EditOutlined className={'icon'}/>,
                            <EllipsisOutlined className={'icon'}/>
                        ]}>
                        <List.Item.Meta
                            avatar={<Checkbox name={'completed'} checked={todo.completed}
                                              onChange={onChange(todo.id)}/>}
                            title={todo.title}
                            description={todo.text}
                        />
                    </List.Item>
                }
            >
            </List>
        </div>
    )
}

TodoList.defaultProps = {}
