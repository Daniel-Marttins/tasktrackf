import { Button, Checkbox, Form, Input, Spin } from "antd";
import Background from '../../assets/img/watercolor-light-steel-blue-wallpaper-image.jpg';
import { useRegisterHook } from "./hooks/useRegisterHook";
import { LoadingOutlined } from '@ant-design/icons';

export const Register: React.FC = () => {
    const {  
        form,
        onFinish,
        spinning,
    } = useRegisterHook();

    return (
        <div className="flex w-full h-full p-4" style={{ background: "#1F2127" }}>
            <Spin spinning={spinning} tip="Criando..." fullscreen indicator={<LoadingOutlined spin />} />
            <div className="flex flex-col items-center justify-center w-2/5 overflow-hidden">
                <h1 className="flex flex-col items-center justify-center text-3xl font-bold text-center text-white">
                    <a href="/">TaskTrack</a>
                    <span className="text-4xl font-bold text-blue-500 w-64 text-center mt-6">
                        Cadastre sua conta
                    </span>
                </h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="flex flex-col mt-16 w-72 items-center justify-center overflow-hidden"
                >
                    <Form.Item
                        name="username"
                        label={<span className="font-bold text-white">Nome</span>}
                        rules={[
                            { required: true, type: 'string', message: "Nome é necessario!" },
                        ]}
                        className="w-full"
                    >
                        <Input
                            placeholder="Nome"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={<span className="font-bold text-white">Email</span>}
                        rules={[
                            { required: true, type: 'email', message: "Email é necessario!" },
                        ]}
                        className="w-full"
                    >
                        <Input
                            placeholder="Email"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<span className="font-bold text-white">Senha</span>}
                        rules={[
                            { required: true, type: 'string', message: "Senha é necessaria!" },
                        ]}
                        className="w-full"
                    >
                        <Input.Password
                            type="password"
                            placeholder="Senha"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item className="w-full">
                        <Button htmlType="submit" type="primary" className="rounded-full w-full h-9 mt-2">Registrar</Button>
                    </ Form.Item>
                    <Form.Item className="w-full">
                        <span className="flex items-center justify-center text-sm text-slate-500 mt-4">Já possui uma conta? <a href="/login" className="text-blue-500 hover:text-blue-600"> Clique aqui!</a></span>
                    </ Form.Item>
                </Form>
            </div>
            <div className="flex flex-col w-3/5 bg-white rounded-3xl object-cover">
                <img src={Background} style={{ width: "100%", height: "100%" }} className="rounded-3xl" />
            </div>
        </div>
    )
}