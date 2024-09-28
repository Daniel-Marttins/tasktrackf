/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, List, Modal, Popover, Select, Spin, Tabs, Tooltip } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { BsMenuAppFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FaBarsProgress } from "react-icons/fa6";
import { FcTodoList } from "react-icons/fc";
import { GrView } from "react-icons/gr";
import { LuListTodo } from "react-icons/lu";
import { MdFavorite, MdFavoriteBorder, MdHistory, MdOutlineSwapHoriz } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import todoIcon from "../../assets/img/simplistic-project-management-and-business-workflow.png";
import { useToDoManagementHook } from "../../hooks/useToDoManagementHook";
import { ToDoItem } from "../../models/ToDoItem";
import { FormToDo } from "./components/FormToDo";
import { ToDoListItem } from './components/ToDoListItem';

const { Option } = Select;

export const ToDo: React.FC = () => {
    const {
        toDo,
        toDoItem,
        selectedToDo,
        getToDo,
        open,
        openModal,
        closeModal,
        spinning,
        setSpining,
        editMode,
        setEditMode,
        favoriteToDo,
        deleteToDoItem,
        openPopoverId,
        openSwitchPopover,
        switchToDoStatus,
        activeTabKey,
        handleTabChange
    } = useToDoManagementHook();

    const customTabBar = (icon: any, title: string) => (
        <div className="flex items-center justify-center space-x-2 h-full">
            {icon}
            <span>{title}</span>
        </div>
    );

    return (
        <div className="flex items-center justify-center w-full h-full">
            <Spin spinning={spinning} tip="Atualizando..." fullscreen indicator={<LoadingOutlined spin />} />
            <Tabs defaultActiveKey="1" size="middle" tabPosition="top" className="w-full h-full" onChange={handleTabChange}>
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
                        <div className="mr-3 w-2/4">
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
                                    <ToDoListItem
                                        item={item}
                                        selectedToDo={selectedToDo}
                                        switchToDoStatus={switchToDoStatus}
                                        favoriteToDo={favoriteToDo}
                                        deleteToDoItem={deleteToDoItem}
                                    />
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
                                <ToDoListItem
                                    item={item}
                                    selectedToDo={selectedToDo}
                                    switchToDoStatus={switchToDoStatus}
                                    favoriteToDo={favoriteToDo}
                                    deleteToDoItem={deleteToDoItem}
                                />
                            )
                        )}
                    />
                </TabPane>
                <TabPane tab={customTabBar(<FaBarsProgress className="text-xl" />, "Em Andamento")} key="3">
                    <List
                        dataSource={toDo || []}
                        renderItem={(item: ToDoItem) => (
                            item.taskStatus === "IN_PROGRESS" && (
                                <ToDoListItem
                                    item={item}
                                    selectedToDo={selectedToDo}
                                    switchToDoStatus={switchToDoStatus}
                                    favoriteToDo={favoriteToDo}
                                    deleteToDoItem={deleteToDoItem}
                                />
                            )
                        )}
                    />
                </TabPane>
                <TabPane tab={customTabBar(<FcTodoList className="text-xl" />, "Concluídos")} key="4">
                    <List
                        dataSource={toDo || []}
                        renderItem={(item: ToDoItem) => (
                            item.taskStatus === "DONE" && (
                                <ToDoListItem
                                    item={item}
                                    selectedToDo={selectedToDo}
                                    switchToDoStatus={switchToDoStatus}
                                    favoriteToDo={favoriteToDo}
                                    deleteToDoItem={deleteToDoItem}
                                />
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
                className="overflow-hidden custom-modal"
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
                    toDoItem={toDoItem || null}
                    setEditMode={setEditMode}
                />
            </Modal>
        </div>
    );
}