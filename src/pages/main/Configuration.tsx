import { Button, Divider, Form, Input, Modal, Space, Spin, Tooltip } from "antd";
import ThemeToggleButton from "../../components/ThemeToggleButton"
import { useTheme } from "../../contexts/ThemeContext";
import { useSettingsHook } from "./hooks/useSettingsHook";
import { MdSwapHoriz } from "react-icons/md";
import { LoadingOutlined } from '@ant-design/icons';

export const Configuration: React.FC = () => {
    const { palette } = useTheme();
    const { open, openSettings, closeSettings, form, onFinish, handleDeleteUser, spinning } = useSettingsHook();

    return (
        <div className="flex flex-col w-full h-full">
            <Spin spinning={spinning} tip="Excluindo..." fullscreen indicator={<LoadingOutlined spin />} />
            <h1 className="flex text-2xl font-bold w-full border-b p-2" style={{ color: palette.fontColor, borderColor: palette.fontColor }}>Configurações</h1>
            <div className="flex items-center justify-between w-full border-b p-2 h-20" style={{ borderColor: palette.fontColor }}>
                <h1 style={{ fontSize: "16px", color: palette.fontColor }} className="flex flex-col font-bold">
                    Mudar tema
                    <span style={{ fontSize: "10px" }} className="text-slate-400">Mudar tema do sistema</span>
                </h1>
                <ThemeToggleButton />
            </div>
            <div className="flex items-center justify-between w-full border-b p-2 h-20" style={{ borderColor: palette.fontColor }}>
                <h1 style={{ fontSize: "16px", color: palette.fontColor }} className="flex flex-col font-bold">
                    Alterar senha
                    <span style={{ fontSize: "10px" }} className="text-slate-400">Mudar senha de usuário</span>
                </h1>
                <a href="#change-password" onClick={() => openSettings()} className="flex text-sm font-bold text-blue-600">Clique aqui</a>
                <Modal
                    open={open}
                    onCancel={closeSettings}
                    footer={null}
                    maskClosable={false}
                    centered
                    width={500}
                    className='overflow-hidden'
                >
                    <Divider orientation="left" className="m-0 p-0" style={{ border: palette.fontColor }}>
                        <h1 style={{ color: palette.fontColor }}>
                            Alterar Senha
                        </h1>
                    </Divider>
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
                        <div className="flex flex-col mr-3" style={{ width: '40%' }}>
                            <h1 className=" flex flex-col" style={{ color: palette.fontColor }}>
                                Alteração de senha
                                <span className="text-xs text-gray-400">
                                    Informe a senha antiga e nova senha
                                </span>
                            </h1>
                        </div>
                        <div className="flex flex-col border-l border-slate-400 p-2" style={{ width: '60%' }}>
                            <Form.Item
                                name="oldPassword"
                                label={<span style={{ color: palette.fontColor }}>Senha antiga</span>}
                                className="w-full mr-3"
                                rules={[
                                    { required: true, message: "Insira a senha anterior!" },
                                ]}
                            >
                                <Input.Password style={{ background: palette.secondary, color: palette.fontColor }} />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                label={<span style={{ color: palette.fontColor }}>Nova senha</span>}
                                className="w-full"
                                rules={[
                                    { required: true, message: "Insira a nova senha!" },
                                ]}
                                normalize={(value: string) => value?.toUpperCase()}
                            >
                                <Input.Password style={{ textTransform: "uppercase", background: palette.secondary, color: palette.fontColor }} />
                            </Form.Item>
                            <Button style={{ background: palette.secondary, color: palette.fontColor }} htmlType="submit" icon={<MdSwapHoriz className='text-green-600 w-full' />}>
                                Alterar
                            </Button>
                        </div>

                    </Form>
                </Modal>
            </div>
            <div className="flex items-center justify-between w-full border-b p-2 h-20" style={{ borderColor: palette.fontColor }}>
                <h1 style={{ fontSize: "16px" }} className="flex flex-col font-bold text-red-500">
                    Exluir Conta
                    <span style={{ fontSize: "10px" }} className="text-slate-400">Excluir minha conta</span>
                </h1>
                <a href="#delete-account" onClick={() => handleDeleteUser()} className="flex text-sm font-bold text-red-400">Clique aqui</a>
            </div>
        </div>
    )
}