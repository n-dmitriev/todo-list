import './app.scss'
import {Layout} from 'antd'
import {ProjectMenu} from './components/ProjectMenu/ProjectMenu'
import {Header} from './components/Header/Header'
import {useTypedSelector} from './common/hooks'
import {Switch, Route, Redirect} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from "./router"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {checkForAuthorize} from "./store/auth/authActions"

const App = () => {
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
            <Redirect to={RouteNames.LOGIN}/>
        </Switch>

    return (
        <div>
            <Layout className="app" style={{}}>
                <ProjectMenu/>
                <Layout className="site-layout">
                    <Header/>
                    {isAuth ? renderPrivateSwitch() : renderPublicSwitch()}
                </Layout>
            </Layout>
        </div>
    )
}

export default App
