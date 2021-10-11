import * as React from 'react'
import {useState} from "react";
import {Button, Card, Form, Input} from "antd";
import {PlusOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {useDispatch} from "react-redux";
import {createProject} from '../../store/projects/projectsActions';

interface Props {
}

export const CreateProject: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch()
    const [formIsShow, showOrHideForm] = useState(false)
    const [name, setName] = useState('')
    const [isValid, setValid] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setValid(!!value)
        setName(value)
    }

    const onCreateProject = () => {
        if (isValid) {
            dispatch(createProject(name))
            setValid(false)
            setName('')
        }
    }

    return (
        <React.Fragment>
            {
                formIsShow ?
                    <Form>
                        <Card actions={[
                            <CheckOutlined onClick={onCreateProject}/>,
                            <CloseOutlined onClick={() => showOrHideForm(false)}/>
                        ]}>

                            <Form.Item
                                name="title"
                                rules={[{required: true, message: 'Введите название задачи!'}]}
                            >
                                <Input placeholder={"Название проекта"} value={name}
                                       onChange={onChange}/>
                            </Form.Item>

                        </Card>
                    </Form>
                    :
                    <Button type="dashed" block icon={<PlusOutlined/>} onClick={() => showOrHideForm(true)}>
                        Добавить проект
                    </Button>
            }
        </React.Fragment>
    )
}

CreateProject.defaultProps = {}
