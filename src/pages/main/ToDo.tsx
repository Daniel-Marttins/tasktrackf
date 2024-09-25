/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Divider, List, Modal, Space, Spin, Tabs, Tooltip } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { FcTodoList } from "react-icons/fc";
import { LuListTodo } from "react-icons/lu";
import { FaBarsProgress } from "react-icons/fa6";
import { MdFavoriteBorder, MdFavorite, MdHistory } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { CiCircleList, CiEdit } from "react-icons/ci";
import { BsMenuAppFill } from "react-icons/bs";
import { useToDoManagementHook } from "../../hooks/useToDoManagementHook";
import { ToDoItem } from "../../models/ToDoItem";
import { LoadingOutlined } from '@ant-design/icons';
import { FormToDo } from "./components/FormToDo";
import todoIcon from "../../assets/img/simplistic-project-management-and-business-workflow.png";

export const ToDo: React.FC = () => {
    const {
        toDo,
        getToDo,
        open,
        openModal,
        closeModal,
        spinning,
        setSpining,
        editMode,
        setEditMode
    } = useToDoManagementHook();

    const customTabBar = (icon: any, title: string) => (
        <div className="flex items-center justify-center space-x-2 h-full">
            {icon}
            <span>{title}</span>
        </div>
    );

    return (
        <div className="flex items-center justify-center w-full h-full">
            <Spin spinning={spinning} fullscreen={true} indicator={<LoadingOutlined spin />} />
            <Tabs defaultActiveKey="1" size="middle" tabPosition="top" className="w-full h-full">
                <TabPane tab={customTabBar(<BsMenuAppFill className="text-xl" />, "Menu To-Do")} key="1">
                    <div className="flex flex-row justify-between w-full h-1/2 mb-5">
                        <div className="justify-start w-80">
                            <h1 className="text-2xl flex flex-col">
                                Menu de Tarefas
                                <span className="text-xs text-gray-400 mb-5">
                                    Aqui você pode gerenciar todas suas tarefas, favorita-lás e modifica-lás a sua maneira.
                                </span>
                            </h1>
                            <img src={todoIcon} />
                        </div>
                        <div className="mr-3">
                            <div className="mb-5">
                                <h1 className="flex items-center justify-start text-2xl font-bold mb-3">
                                    Últimas tarefas adicionadas
                                    <MdHistory className="ml-2 mt-0.5" />
                                </h1>
                                <Button type="primary" onClick={openModal}>Nova tarefa</Button>
                            </div>
                            <List
                                dataSource={toDo || []}
                                renderItem={(item: ToDoItem) => (
                                    <List.Item key={item.id}>
                                        <div style={{ flex: 1 }} className="mr-5">
                                            <strong className="text-sm">{item.title}</strong>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button icon={item.favorite === true ? <MdFavorite className="text-blue-500" /> : <MdFavoriteBorder className="text-blue-500" />}></Button>
                                            <Button icon={<GrView className="text-yellow-500" />}></Button>
                                            <Button icon={<CiEdit className="text-green-500" />}></Button>
                                            <Button icon={<TiDelete className="text-red-500" />}></Button>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={customTabBar(<LuListTodo className="text-xl" />, "A Fazer")} key="2">
                    <List
                        dataSource={toDo || []}
                        renderItem={(item: ToDoItem) => (
                            item.taskStatus === "TODO" && (
                                <List.Item key={item.id}>
                                    <div style={{ flex: 1 }}>
                                        <strong>{item.title}</strong>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button icon={item.favorite === true ? <MdFavorite className="text-blue-500" /> : <MdFavoriteBorder className="text-blue-500" />}></Button>
                                        <Button icon={<GrView className="text-yellow-500" />}></Button>
                                        <Button icon={<CiEdit className="text-green-500" />}></Button>
                                        <Button icon={<TiDelete className="text-red-500" />}></Button>
                                    </div>
                                </List.Item>
                            )
                        )}
                    />
                </TabPane>
                <TabPane tab={customTabBar(<FaBarsProgress className="text-xl" />, "Em Andamento")} key="3">
                    <List
                        dataSource={toDo || []}
                        renderItem={(item: ToDoItem) => (
                            item.taskStatus === "IN_PROGRESS" && (
                                <List.Item key={item.id}>
                                    <div style={{ flex: 1 }}>
                                        <strong>{item.title}</strong>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button icon={item.favorite === true ? <MdFavorite className="text-blue-500" /> : <MdFavoriteBorder className="text-blue-500" />}></Button>
                                        <Button icon={<GrView className="text-yellow-500" />}></Button>
                                        <Button icon={<CiEdit className="text-green-500" />}></Button>
                                        <Button icon={<TiDelete className="text-red-500" />}></Button>
                                    </div>
                                </List.Item>
                            )
                        )}
                    />
                </TabPane>
                <TabPane tab={customTabBar(<FcTodoList className="text-xl" />, "Concluídos")} key="4">
                    <List
                        dataSource={toDo || []}
                        renderItem={(item: ToDoItem) => (
                            item.taskStatus === "DONE" && (
                                <List.Item key={item.id}>
                                    <div style={{ flex: 1 }}>
                                        <strong>{item.title}</strong>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button icon={item.favorite === true ? <MdFavorite className="text-blue-500" /> : <MdFavoriteBorder className="text-blue-500" />}></Button>
                                        <Button icon={<GrView className="text-yellow-500" />}></Button>
                                        <Button icon={<CiEdit className="text-green-500" />}></Button>
                                        <Button icon={<TiDelete className="text-red-500" />}></Button>
                                    </div>
                                </List.Item>
                            )
                        )}
                    />
                </TabPane>
            </Tabs>
            <Modal
                open={open}
                onCancel={closeModal}
                footer={null}
                maskClosable={false}
                centered
                width={800}
                className="overflow-hidden"
            >
                <Divider orientation="left" className="m-0 p-0">
                    <h1 className="text-xl">
                        Menu Tarefas
                    </h1>
                </Divider>
                <FormToDo
                    refreshToDoList={getToDo}
                    onCloseModal={closeModal}
                    editMode={editMode}
                />
            </Modal>
        </div>
    );
}