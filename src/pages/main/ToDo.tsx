import { Button, List, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { FcTodoList } from "react-icons/fc";
import { LuListTodo } from "react-icons/lu";
import { FaBarsProgress } from "react-icons/fa6";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";

export const ToDo: React.FC = () => {
    const customTabBar = (icon: any, title: string) => (
        <div className="flex items-center justify-center space-x-2 h-full">
            {icon}
            <span>{title}</span>
        </div>
    );

    const tasks: any[] = [
        { id: 1, title: 'Tarefa 1', description: 'Descrição da tarefa 1', taskStatus: 's', favorite: true, color: 'blue' },
        { id: 2, title: 'Tarefa 2', description: 'Descrição da tarefa 2', taskStatus: 's', favorite: false, color: 'green' },
    ];

    return (
        <div className="flex items-center justify-center w-full h-full">
            <Tabs defaultActiveKey="1" size="middle" tabPosition="top" className="w-full h-full">
                <TabPane tab={customTabBar(<LuListTodo className="text-xl" />, "A Fazer")} key="1">
                    <Button>Nova tarefa</Button>
                    <List
                        
                        dataSource={tasks}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <div style={{ flex: 1 }}>
                                    <strong>{item.title}</strong>
                                    <p>{item.description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button icon={item.favorite === true ? <MdFavoriteBorder className="text-blue-500" /> : <MdFavorite className="text-blue-500" />}></Button>
                                    <Button icon={<GrView className="text-yellow-500"/>}></Button>
                                    <Button icon={<CiEdit className="text-green-500"/>}></Button>
                                    <Button icon={<TiDelete className="text-red-500" />}></Button>
                                </div>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab={customTabBar(<FaBarsProgress className="text-xl" />, "Em Andamento")} key="2">
                </TabPane>
                <TabPane tab={customTabBar(<FcTodoList className="text-xl" />, "Concluídos")} key="3">

                </TabPane>
            </Tabs>
        </div>
    );
}