import * as React from 'react'
import {TodoForm} from "../TodoForm/TodoForm"
import {useEffect, useState} from "react"
import {useTypedSelector} from "../../common/hooks"
import {Button, Form, Input, Typography} from 'antd'
import {PlusOutlined, EditOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {TodoList} from "../TodoList/TodoList"
import './Project.scss'

const {Title} = Typography

interface Props {
}

export const Project: React.FC<Props> = (props: Props) => {
    const [formIsShow, showOrHideForm] = useState(false)
    const [formIsEdit, setEditForm] = useState(false)
    const {editableTodo, activeProject} = useTypedSelector(state => state.todo)
    const [name, setName] = useState('')

    useEffect(() => {
        setName(activeProject?.projectName || '')
    }, [activeProject])

    const onApply = () => {

    }

    return (
        <div className={'project'}>
            {
                formIsEdit
                    ? <Form>
                        <Form.Item
                            className={'project__form'}
                            name="name"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input value={name} onChange={e => setName(e.target.value)}/>
                            <div className={'project__form-buttons'}>
                                <CheckOutlined/>
                                <CloseOutlined onClick={() => setEditForm(false)}/>
                            </div>
                        </Form.Item>
                    </Form>
                    :
                    <div className={'project__edit'}>
                        <Title onClick={onApply} level={3}>{activeProject?.projectName}</Title>
                        <EditOutlined onClick={() => setEditForm(true)}/>
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
