import * as React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Form, Input, Card} from 'antd'
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import {useTypedSelector} from "../../common/hooks";
import {createTodo} from '../../store/todoProject/todoActions\''

interface Props {
    showOrHideForm: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoForm: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch()
    const {activeProject} = useTypedSelector(state => state.todo)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        resetInputs()
    }, [activeProject])

    const onCreateTodo = () => {
        if (title.trim() && text.trim()) {
            dispatch(createTodo({title, text}))
            resetInputs()
        }
    }

    const resetInputs = () => {
        setTitle('')
        setText('')
    }

    return (
        <div className={'todo__form'}>
            <Card
                actions={[
                    <CheckOutlined onClick={onCreateTodo}/>,
                    <CloseOutlined onClick={() => props.showOrHideForm(false)}/>
                ]}
            >
                <Form>
                    <Form.Item
                        name="title"
                        rules={[{required: true, message: 'Введите заголовок задачи!'}]}
                    >
                        <div className="ant-form-item-control-input-content">
                            <input type={'text'} className="ant-input"
                                   placeholder={'Заголовок задачи'} value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                        </div>
                    </Form.Item>
                    <Form.Item name="text">
                        <div className="ant-form-item-control-input-content">
                            <textarea className="ant-input" cols={3}
                                      placeholder={'Описание задачи'} value={text}
                                      onChange={e => setText(e.target.value)}/>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

TodoForm.defaultProps = {
    showOrHideForm: () => null
}
