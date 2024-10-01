import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from "antd";
import Background from '../../assets/img/watercolor-light-steel-blue-wallpaper-image.jpg';
import { useRegisterHook } from "./hooks/useRegisterHook";

export const Register: React.FC = () => {
    const {  
        form,
        onFinish,
        spinning,
    } = useRegisterHook();

    return (
        <div className="flex flex-col items-center justify-center md:flex-row w-full h-full p-4 overflow-hidden" style={{ background: "#1F2127" }}>
            <Spin spinning={spinning} tip="Criando..." fullscreen indicator={<LoadingOutlined spin />} />
            
            <div className="flex flex-col items-center justify-center w-full md:w-2/5 overflow-hidden">
                <h1 className="flex flex-col text-3xl font-bold text-center text-white">
                    <a href="/">TaskTrack</a>
                    <span className="text-4xl font-bold text-blue-500 w-64 text-center mt-6">
                        Cadastre sua conta
                    </span>
                </h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="flex flex-col mt-16 w-full max-w-sm mx-auto items-center justify-center"  // Limita a largura do form
                >
                    <Form.Item
                        name="username"
                        label={<span className="font-bold text-white">Nome</span>}
                        rules={[{ required: true, type: 'string', message: "Nome é necessário!" }]}
                        className="w-5/6"
                    >
                        <Input
                            placeholder="Nome"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={<span className="font-bold text-white">Email</span>}
                        rules={[{ required: true, type: 'email', message: "Email é necessário!" }]}
                        className="w-5/6"
                    >
                        <Input
                            placeholder="Email"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<span className="font-bold text-white">Senha</span>}
                        rules={[{ required: true, message: "Senha é necessária!" }]}
                        className="w-5/6"
                    >
                        <Input.Password
                            type="password"
                            placeholder="Senha"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item className="w-5/6">
                        <Button htmlType="submit" type="primary" className="rounded-full w-full h-9 mt-2">Registrar</Button>
                    </Form.Item>
                    <Form.Item className="w-5/6">
                        <span className="flex items-center justify-center text-sm text-slate-500 mt-4">
                            Já possui uma conta? <a href="/login" className="text-blue-500 hover:text-blue-600">Clique aqui!</a>
                        </span>
                    </Form.Item>
                </Form>
            </div>
        
            <div className="hidden md:flex flex-col w-3/5 bg-white rounded-3xl" style={{ height: "98%" }}>
                <img src={Background} alt="Background" className="rounded-3xl object-cover w-full h-full" />
            </div>
        </div>
    )
}
