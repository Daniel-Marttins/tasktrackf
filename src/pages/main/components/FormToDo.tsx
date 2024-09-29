/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, Space, Spin, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineSave } from "react-icons/md";
import { ToDoItem } from "../../../models/ToDoItem";
import { useToDoHook } from "../hooks/useToDoHook";
import { useTheme } from '../../../contexts/ThemeContext';

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
    toDoItem
}) => {
    const {
        form,
        onFinish,
        colors,
        selectedColor,
        handleColorSelect,
        spinning,
        handleDeleteToDo
    } = useToDoHook(refreshToDoList, onCloseModal, editMode, toDoItem);

    const { palette, theme } = useTheme();

    return (
        <div className="flex flex-row justify-between w-full h-1/2 mb-5">
            <Spin spinning={spinning} tip={editMode === false ? "Criando..." : "Atualizando..."} fullscreen indicator={<LoadingOutlined spin />} />
            <div className="justify-start w-80">
                <h1 className="text-xl flex flex-col" style={{ color: palette.fontColor }}>
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
                    <Tooltip title={editMode === false ? "Salvar" : "Editar"}><Button style={{ background: palette.secondary }} htmlType="submit" icon={editMode === false ? <MdOutlineSave className='text-green-600' /> : <CiEdit className='text-green-600' />}></Button></Tooltip>
                    {editMode && <Tooltip title={"Deletar"}><Button onClick={() => handleDeleteToDo(toDoItem!.id)} style={{ background: palette.secondary }} icon={<MdDeleteOutline className='text-red-600' />}></Button></Tooltip>}
                </Space>
                <div className="flex flex-row w-full">
                    <Form.Item name="id" label={<span style={{ color: palette.fontColor }}>ID</span>} className="w-1/1 mr-3">
                        <Input style={{ background: palette.secondary, color: palette.fontColor }} disabled />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label={<span style={{ color: palette.fontColor }}>Titulo</span>}
                        className="w-4/5"
                        rules={[
                            { required: true, message: "Insira um titulo!" },
                        ]}
                        normalize={(value: string) => value?.toUpperCase()}
                    >
                        <Input style={{ textTransform: "uppercase", background: palette.secondary, color: palette.fontColor }} />
                    </Form.Item>
                </div>
                <div className="flex flex-row w-full">
                    <Form.Item
                        name="description"
                        label={<span style={{ color: palette.fontColor }}>Descrição</span>}
                        className="w-full"
                        normalize={(value: string) => value?.toUpperCase()}
                    >
                        <Input style={{ textTransform: "uppercase", background: palette.secondary, color: palette.fontColor }} />
                    </Form.Item>
                </div>
                <div className="flex flex-row w-full">
                    <Form.Item
                        name="taskStatus"
                        label={<span style={{ color: palette.fontColor }}>Status</span>}
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
                        <Select style={{ textTransform: "uppercase", color: palette.fontColor }} defaultValue={"Selecione"} className={ theme === 'light' ? 'light-select' : 'dark-select'}>
                            <Option value="">Selecione</Option>
                            <Option value="TODO">To-Do</Option>
                            <Option value="IN_PROGRESS">Em Progresso</Option>
                            <Option value="DONE">Concluído</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="favorite"
                        label={<span style={{ color: palette.fontColor }}>Favoritar</span>}
                        className="w-2/6"
                        valuePropName="checked"
                    >
                        <Checkbox style={{ color: palette.fontColor }}>Favoritar?</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="color"
                        label={<span style={{ color: palette.fontColor }}>Cor</span>}
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