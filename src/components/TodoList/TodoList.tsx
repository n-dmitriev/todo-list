import * as React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {List, Checkbox, Menu, Dropdown} from 'antd';
import {EditOutlined, EllipsisOutlined, CloseOutlined} from '@ant-design/icons';
import {ITodo} from "../../models/ITodo";
import {editTodo} from '../../store/todoProject/todoReducer';

interface Props {
}

export const TodoList: React.FC = (props: Props) => {
    const {activeProject} = useSelector((state: RootState) => state.todo)
    const dispatch = useDispatch()

    const onChange = (id: string) => (e: any) => {
        dispatch(editTodo({name: e.target.name, value: e.target.value || e.target.checked, id}))
    }

    const renderMenu = () =>
        <Menu>
            <Menu.Item key="1">
                <EditOutlined className={'icon'}/> Редактировать
            </Menu.Item>
            <Menu.Item key="2">
                <CloseOutlined className={'icon'}/> Удалить
            </Menu.Item>
        </Menu>

    return (
        <div className={'todo__list'}>
            <List
                dataSource={activeProject?.todosList || []}
                renderItem={(todo: ITodo) =>
                    <List.Item
                        key={todo.id}
                        actions={[
                            <Dropdown overlay={renderMenu}>
                                <EllipsisOutlined className={'icon'}/>
                            </Dropdown>
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
