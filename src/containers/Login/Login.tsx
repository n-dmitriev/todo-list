import * as React from 'react'
import {Form, Input, Button, Layout} from 'antd'
import './Login.scss'
import {useTypedSelector} from '../../common/hooks'
import {useState} from 'react'
import {useDispatch} from "react-redux"
import {authorization} from '../../store/auth/authActions'

interface Props {
}

export const Login: React.FC<Props> = (props: Props) => {
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFinish = () => dispatch(authorization({email: email, password}))

    return (
        <Layout.Content className="login">
            <Form
                className={'login__form'}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Логин"
                    name="email"
                    rules={[{required: true, message: 'Введите логин!'}]}
                >
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Введите пароль!'}]}
                >
                    <Input.Password
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Item>

                {error && <div style={{color: 'red'}}>
                    {error}
                </div>}

                <div className={'login__password'}>
                    <Button type="link" htmlType="button">
                        Забыли пароль?
                    </Button>
                </div>

                <Form.Item wrapperCol={{offset: 3, span: 30}}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Войти
                    </Button>
                    <Button htmlType="button">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    )
}

Login.defaultProps = {}
