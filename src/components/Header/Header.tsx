import * as React from 'react'
import {Layout, Menu} from "antd"
import {useTypedSelector} from "../../common/hooks";
import {useDispatch} from "react-redux";
import {logout} from "../../store/auth/authActions";

interface Props {
}

export const Header: React.FC<Props> = (props: Props) => {
    const {isAuth} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const onLogout = () => dispatch(logout())

    return (
        <Layout.Header>
            <Menu theme="dark" mode="horizontal">
                {isAuth && <Menu.Item key="1" onClick={onLogout}>Выйти</Menu.Item>}
            </Menu>
        </Layout.Header>
    )
}

Header.defaultProps = {}
