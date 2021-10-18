import './app.scss'
import {Layout} from 'antd'
import {ProjectMenu} from './components/ProjectMenu/ProjectMenu'
import {Header} from './components/Header/Header'
import {useTypedSelector} from './common/hooks'
import {Switch, Route, Redirect} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from './router'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {checkForAuthorize} from './store/auth/authActions'
import {Context} from './appContext'

const App = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {isAuth} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(checkForAuthorize())
    }, [])

    const renderPrivateSwitch = () =>
        <Switch>
            {privateRoutes.map(route => <Route {...route} key={route.path}/>)}
            <Redirect to={RouteNames.PROJECTS}/>
        </Switch>


    const renderPublicSwitch = () =>
        <Switch>
            {publicRoutes.map(route => <Route {...route} key={route.path}/>)}
            <Redirect to={RouteNames.SIGN_IN}/>
        </Switch>

    return (
        <div>
            <Layout className="app" style={{}}>
                {isAuth && <ProjectMenu collapsed={collapsed} setCollapsed={setCollapsed}/>}
                <Layout className="site-layout">
                    <Header/>
                    <Context.Provider value={{collapsed}}>
                        {isAuth ? renderPrivateSwitch() : renderPublicSwitch()}
                    </Context.Provider>
                </Layout>

            </Layout>
        </div>
    )
}

export default App
