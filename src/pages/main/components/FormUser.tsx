/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Form, Input, Select, Space, Spin, Tooltip, Upload } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineSave } from "react-icons/md";
import { ToDoItem } from "../../../models/ToDoItem";
import { useToDoHook } from "../hooks/useToDoHook";
import { User } from '../../../models/User';
import { useUserHook } from '../hooks/useUserHook';
import moment from 'moment';
import { useTheme } from '../../../contexts/ThemeContext';

const { Option } = Select;

export interface FormProps {
    refreshUser: () => void;
    onCloseModal: () => void;
    editMode: boolean;
    userData?: User | null;
}

export const FormUser: React.FC<FormProps> = ({
    refreshUser,
    onCloseModal,
    editMode,
    userData
}) => {
    const {
        form,
        spinning,
        onFinish,
        image,
        handleChange,
        handleRemove
    } = useUserHook(
        refreshUser,
        onCloseModal,
        editMode,
        userData
    );

    const { palette } = useTheme();

    return (
        <div className="flex flex-row justify-between w-full h-1/2 mb-5">
            <Spin spinning={spinning} tip={editMode === false ? "Criando..." : "Atualizando..."} fullscreen indicator={<LoadingOutlined spin />} />
            <Form
                form={form}
                name="basic"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                className="flex w-full h-full relative"
                layout="vertical"
                autoComplete="off"
            >
                <div className="flex flex-col items-center justify-center w-2/6">
                    {image ? (
                        <Avatar
                            src={image}
                            size={90}
                            className="mb-6 shadow-md"
                            onClick={handleRemove}
                            style={{ cursor: "pointer" }}
                        />
                    ) : (
                        <Form.Item name="imgUrl" label="" className="w-1/1 mr-3">
                            <Upload
                                className="w-full flex-row "
                                accept="image/*"
                                listType="picture"
                                maxCount={1}
                                onChange={handleChange}
                                beforeUpload={() => false}
                            >
                                <Button icon={<UserOutlined />}>Imagem</Button>
                            </Upload>
                        </Form.Item>
                    )}
                    <div className="mt-5 flex flex-col">
                        <span className="text-lg font-semibold text-center">{userData?.username}</span>
                        <span className="text-sm text-gray-500 text-center">Criado em: {moment(userData?.createAt).format('DD-MM-YYYY')}</span>
                    </div>
                </div>
                <div className="w-9/12 border-l p-2 border-gray-300 h-full flex-col">
                    <Space className="absolute right-3 -top-5">
                        <Tooltip title={editMode === false ? "Salvar" : "Editar"}><Button style={{ background: palette.secondary }} htmlType="submit" icon={editMode === false ? <MdOutlineSave className='text-green-600' /> : <CiEdit className='text-green-600' />}></Button></Tooltip>
                    </Space>
                    <div className="flex flex-row w-full">
                        <Form.Item name="id" label={<span style={{ color: palette.fontColor }}>ID</span>} className="w-1/1 mr-3">
                            <Input style={{ background: palette.secondary, color: palette.fontColor }} disabled />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label={<span style={{ color: palette.fontColor }}>Nome de usuário</span>}
                            className="w-4/5"
                            rules={[
                                { required: true, message: "Insira um nome!" },
                            ]}
                            normalize={(value: string) => value?.toUpperCase()}
                        >
                            <Input style={{ textTransform: "uppercase", background: palette.secondary, color: palette.fontColor }} />
                        </Form.Item>
                    </div>
                    <div className="flex flex-row w-full">
                        <Form.Item
                            name="email"
                            label={<span style={{ color: palette.fontColor }}>Email</span>}
                            className="w-full"
                            normalize={(value: string) => value?.toUpperCase()}
                        >
                            <Input style={{ textTransform: "uppercase", background: palette.secondary, color: palette.fontColor }} />
                        </Form.Item>
                    </div>
                </div>
            </Form >
        </div >
    );
}