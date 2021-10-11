import * as React from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {List, Checkbox} from 'antd';
import {EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import {ITodo} from "../../models/ITodo";

interface Props {
}

export const TodoList: React.FC = (props: Props) => {
    const {activeProject} = useSelector((state: RootState) => state.todo)

    const onChange = () => {

    }

    return (
        <div className={'todo__list'}>
            <List
                dataSource={activeProject?.todosList || []}
                renderItem={(item: ITodo) =>
                    <List.Item
                        key={item.id}
                        actions={[
                            <EditOutlined/>,
                            <EllipsisOutlined/>
                        ]}>
                        <List.Item.Meta
                            avatar={<Checkbox onChange={onChange}/>}
                            title={item.title}
                            description={item.text}
                        />
                    </List.Item>
                }
            >
            </List>
        </div>
    )
}

TodoList.defaultProps = {}
