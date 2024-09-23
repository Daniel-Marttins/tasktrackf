import React from "react";
import { Card, Button, Avatar } from 'antd'
import { TfiDashboard } from "react-icons/tfi";
import { FaRegEye, FaBarsProgress } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu"
import { FcTodoList } from "react-icons/fc";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { UserOutlined } from '@ant-design/icons';
import { useUserManagementHook } from "../../hooks/useUserManagementHook";
import moment from 'moment';
import { ToDoItem } from "../../models/ToDoItem";

export const Dashboard: React.FC = () => {
    const { user, logout } = useUserManagementHook();

    return (
        <div className="flex flex-col w-full h-full items-center justify-center bg-transparent">
            <h1 className='flex items-center justify-start w-full px-4 text-white mb-4 text-3xl pb-3'>
                <TfiDashboard className="mr-4 ml-2 mt-2 h-full text-3xl font-bold" style={{ color: "#1F2127" }} />
                <span style={{ color: "#1F2127" }} className="font-bold" >Dashboard</span>
            </h1>
            <div className="flex items-start justify-between w-full px-4 mb-8">
                <div className="flex items-center justify-start w-1/2">
                    <Avatar size={64} icon={<UserOutlined />} />
                    <div className="ml-4 flex flex-col">
                        <span className="text-lg font-semibold">{user?.username}</span>
                        <span className="text-sm text-gray-500">Criado em: {moment(user?.createAt).format('DD-MM-YYYY')}</span>
                        <a href="#" className="text-sm text-blue-500 curs">Minha Conta</a>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-center w-1/2 h-full">
                    <Button icon={<CiLogin />} onClick={() => logout()}>Sair</Button>
                </div>
            </div>
            <div className="flex flex-wrap w-full -mx-4">
                <div className="w-full md:w-1/4 px-4 mb-4">
                    <Card
                        bordered={false}
                        className="flex flex-col shadow-lg rounded-lg h-full"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">Total de Tarefas</span>
                            <FcTodoList className="ml-2" />
                        </div>
                        <div className="text-xl font-bold mb-2 text-slate-500">{user?.toDoItems.length}</div>
                        <div className="flex items-center justify-between mt-4 border-t pt-2">
                            <div className="text-sm text-gray-500">Visualizar</div>
                            <Button icon={<FaRegEye />}></Button>
                        </div>
                    </Card>
                </div>

                <div className="w-full md:w-1/4 px-4 mb-4">
                    <Card
                        bordered={false}
                        className="flex flex-col shadow-lg rounded-lg h-full"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-yellow-500">A Fazer</span>
                            <LuListTodo className="ml-2 text-yellow-500" />
                        </div>
                        <div className="text-xl font-bold mb-2 text-slate-500">{`${user?.toDoItems.filter((toDo: ToDoItem) => toDo.taskStatus === "TODO").length}`}</div>
                        <div className="flex items-center justify-between mt-4 border-t pt-2">
                            <div className="text-sm text-gray-500">Visualizar</div>
                            <Button icon={<FaRegEye />}></Button>
                        </div>
                    </Card>
                </div>

                <div className="w-full md:w-1/4 px-4 mb-4">
                    <Card
                        bordered={false}
                        className="flex flex-col shadow-lg rounded-lg h-full"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-blue-500">Em Andamento</span>
                            <FaBarsProgress className="ml-2 text-blue-500" />
                        </div>
                        <div className="text-xl font-bold mb-2 text-slate-500">{`${user?.toDoItems.filter((toDo: ToDoItem) => toDo.taskStatus === "IN_PROGRESS").length}`}</div>
                        <div className="flex items-center justify-between mt-4 border-t pt-2">
                            <div className="text-sm text-gray-500">Visualizar</div>
                            <Button icon={<FaRegEye />}></Button>
                        </div>
                    </Card>
                </div>

                <div className="w-full md:w-1/4 px-4 mb-4">
                    <Card
                        bordered={false}
                        className="flex flex-col shadow-lg rounded-lg h-full"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-green-500">Concluídas</span>
                            <IoCheckmarkCircleOutline className="ml-2 text-green-500" />
                        </div>
                        <div className="text-xl font-bold mb-2 text-slate-500">{`${user?.toDoItems.filter((toDo: ToDoItem) => toDo.taskStatus === "DONE").length}`}</div>
                        <div className="flex items-center justify-between mt-4 border-t pt-2">
                            <div className="text-sm text-gray-500">Visualizar</div>
                            <Button icon={<FaRegEye />}></Button>
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    );
}