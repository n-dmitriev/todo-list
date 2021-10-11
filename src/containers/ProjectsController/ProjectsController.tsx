import * as React from 'react'
import {Row, Col, Layout} from 'antd'
import {useTypedSelector} from "../../common/hooks"
import {CreateProject} from "../../components/CreateProject/CreateProject"
import { Project } from '../../components/Project/Project'
import './ProjectsController.scss'

interface Props {
}

export const ProjectsController: React.FC = (props: Props) => {
    const {activeProject} = useTypedSelector(state => state.todo)

    return (
        <div className={'projects-controller'}>
            <Layout.Content>
                <Row>
                    <Col xs={2} sm={4} md={6}/>
                    <Col xs={20} sm={16} md={12} className={'projects-controller__content'}>
                        {activeProject
                            ? <Project/>
                            : <CreateProject/>
                        }
                    </Col>
                    <Col xs={2} sm={4} md={6}/>
                </Row>
            </Layout.Content>
        </div>
    )
}

ProjectsController.defaultProps = {}
