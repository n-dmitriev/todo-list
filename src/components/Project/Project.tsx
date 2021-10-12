import * as React from 'react'
import {TodoForm} from "../TodoForm/TodoForm"
import {useEffect, useState} from "react"
import {useTypedSelector} from "../../common/hooks"
import {Button, Dropdown, Form, Input, Menu, Typography} from 'antd'
import {PlusOutlined, EditOutlined, CheckOutlined, CloseOutlined, EllipsisOutlined} from '@ant-design/icons'
import {TodoList} from "../TodoList/TodoList"
import './Project.scss'
import {useDispatch} from "react-redux";
import {deleteProject} from "../../store/projects/projectsActions"
import { editProjectName } from '../../store/todoProject/todoActions\''

const {Title} = Typography

interface Props {
}

export const Project: React.FC<Props> = (props: Props) => {
    const [formIsShow, showOrHideForm] = useState(false)
    const [formIsEdit, setEditForm] = useState(false)
    const {editableTodo, activeProject} = useTypedSelector(state => state.todo)
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        setName(activeProject?.projectName || '')
    }, [activeProject])

    useEffect(() => {
        formIsShow && showOrHideForm(false)
    }, [activeProject])

    const onApply = () => {
        if(name.trim()) {
            dispatch(editProjectName(name))
            setEditForm(false)
        }
    }

    const renderMenu = () =>
        <Menu>
            <Menu.Item key="1" onClick={() => setEditForm(true)}>
                <EditOutlined className={'icon'}/> Редактировать
            </Menu.Item>
            <Menu.Item key="2" onClick={() => dispatch(deleteProject(activeProject?.id || ''))}>
                <CloseOutlined className={'icon'}/> Удалить
            </Menu.Item>
        </Menu>

    return (
        <div className={'project'}>
            {
                formIsEdit
                    ? <Form>
                        <Form.Item
                            className={'project__form'}
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input value={name} onChange={e => setName(e.target.value)}/>
                            <div className={'project__form-buttons'}>
                                <CheckOutlined className={'icon'} onClick={onApply}/>
                                <CloseOutlined className={'icon'} onClick={() => setEditForm(false)}/>
                            </div>
                        </Form.Item>
                    </Form>
                    :
                    <div className={'project__edit'}>
                        <Title level={3}>{activeProject?.projectName}</Title>
                        <Dropdown overlay={renderMenu}>
                            <EllipsisOutlined className={'icon'}/>
                        </Dropdown>
                    </div>
            }
            {
                !formIsShow &&
                <Button type="dashed" block icon={<PlusOutlined/>} onClick={() => showOrHideForm(true)}>
                    Добавить задачу
                </Button>
            }
            {
                (formIsShow || editableTodo) &&
                <TodoForm showOrHideForm={showOrHideForm}/>
            }
            <TodoList/>
        </div>
    )
}

Project.defaultProps = {}
