import * as React from 'react'
import {Layout, Menu} from "antd";
import {useEffect, useState} from "react";
import {RightCircleOutlined, DesktopOutlined} from '@ant-design/icons';
import {useTypedSelector} from "../../common/hooks"
import {useDispatch} from "react-redux";
import {getProjects} from '../../store/projects/projectsActions';
import {IProject} from "../../models/IProject"
import {setActiveProject} from '../../store/todoProject/todoReducer';

interface Props {
}

export const ProjectMenu: React.FC<Props> = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false)
    const {projectList} = useTypedSelector(state => state.projects)
    const {activeProject} = useTypedSelector(state => state.todo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    const onClickProject = (project: IProject) => {
        dispatch(setActiveProject(project))
    }

    return (
        <Layout.Sider className={'project-menu'} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="app-logo"><DesktopOutlined/> {!collapsed && 'TodoList'}</div>
            <Menu theme="dark" mode="inline" selectedKeys={[activeProject?.id || '']}>
                {
                    projectList.map(project =>
                        <Menu.Item
                            icon={<RightCircleOutlined/>}
                            onClick={() => onClickProject(project)}
                            key={project.id}
                        >
                            {project.projectName}
                        </Menu.Item>
                    )
                }
            </Menu>
        </Layout.Sider>
    )
}

ProjectMenu.defaultProps = {}
