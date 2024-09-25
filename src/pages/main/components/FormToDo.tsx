/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, Space, Spin, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineSave } from "react-icons/md";
import { ToDoItem } from "../../../models/ToDoItem";
import { useToDoHook } from "../hooks/useToDoHook";

const { Option } = Select;

export interface FormProps {
    refreshToDoList: () => void;
    onCloseModal: () => void;
    editMode: boolean;
    toDoItem?: ToDoItem | null;
    setEditMode: (visible: boolean) => void;
}

export const FormToDo: React.FC<FormProps> = ({
    refreshToDoList,
    onCloseModal,
    editMode,
    toDoItem,
    setEditMode
}) => {
    const {
        form,
        onFinish,
        colors,
        selectedColor,
        handleColorSelect,
        spinning
    } = useToDoHook(refreshToDoList, onCloseModal, editMode, toDoItem);

    return (
        <div className="flex flex-row justify-between w-full h-1/2 mb-5">
            <Spin spinning={spinning} tip={editMode === false ? "Criando..." : "Atualizando..." } fullscreen indicator={<LoadingOutlined spin />} />
            <div className="justify-start w-80">
                <h1 className="text-xl flex flex-col">
                    Detalhes da Tarefa
                    <span className="text-xs text-gray-400">
                        Preencha todos os campos
                    </span>
                </h1>
            </div>
            <Form
                form={form}
                name="basic"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                className="w-4/5 border-l border-gray-300 h-full flex-col p-4 relative"
                layout="vertical"
                autoComplete="off"
            >
                <Space className="absolute right-3 -top-5">
                    <Tooltip title={editMode === false ? "Salvar" : "Editar"}><Button htmlType="submit" icon={editMode === false ? <MdOutlineSave /> : <CiEdit />}></Button></Tooltip>
                    <Tooltip title={"Deletar"}><Button icon={<MdDeleteOutline />}></Button></Tooltip>
                </Space>
                <div className="flex flex-row w-full">
                    <Form.Item name="id" label="ID" className="w-1/1 mr-3">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="Titulo"
                        className="w-4/5"
                        rules={[
                            { required: true, message: "Insira um titulo!" },
                        ]}
                        normalize={(value: string) => value?.toUpperCase()}
                    >
                        <Input style={{ textTransform: "uppercase" }} />
                    </Form.Item>
                </div>
                <div className="flex flex-row w-full">
                    <Form.Item
                        name="description"
                        label="Descrição"
                        className="w-full"
                        normalize={(value: string) => value?.toUpperCase()}
                    >
                        <Input style={{ textTransform: "uppercase" }} />
                    </Form.Item>
                </div>
                <div className="flex flex-row w-full">
                    <Form.Item
                        name="taskStatus"
                        label="Status"
                        className="w-2/6 mr-3"
                        rules={[
                            { required: true, message: "Selecione o status!" },
                            {
                                validator: (_, value) => {
                                    if (value === "") {
                                        return Promise.reject(new Error("Selecione um status válido!"));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Select style={{ textTransform: "uppercase" }} defaultValue={"Selecione"}>
                            <Option value="">Selecione</Option>
                            <Option value="TODO">To-Do</Option>
                            <Option value="IN_PROGRESS">Em Progresso</Option>
                            <Option value="DONE">Concluído</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="favorite"
                        label="Status"
                        className="w-2/6"
                    >
                        <Checkbox>Favoritar?</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="color"
                        label="Cor"
                        className="w-2/6"
                    >
                        {colors.map((color) => (
                            <button
                                key={color}
                                style={{
                                    backgroundColor: color,
                                    margin: '1px',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    border: selectedColor === color ? '3px solid black' : '2px solid #ccc',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleColorSelect(color);
                                }}
                            />
                        ))}
                    </Form.Item>
                </div>
            </Form >
        </div >
    );
}