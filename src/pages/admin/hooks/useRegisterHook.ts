import { Form, Modal } from "antd";
import { User } from "../../../models/User";
import { userService } from "../../../services/UserService";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegisterHook = () => {
    const [ form ] = Form.useForm<User>();
    const { createUser } = userService();
    const { login } = useAuth(); 
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: User) => {
        try {
            setSpinning(true);
            const token = await createUser(values);

            if (token) {
                form.resetFields();
                Modal.success({
                    title: 'Usuário criado com sucesso!',
                    content: 'Sua conta foi criada, aguarde, fazendo login...',
                });
                setTimeout(() => {
                    setSpinning(false);
                }, 5000);
                setTimeout(() => {
                    login(token);
                    navigate('/home');
                }, 2000);
            }
        } catch (error) {
            Modal.error({
                title: 'Falha ao criar usuário',
                content: `${error}`,
            });
            setSpinning(false);
        }
    }

    return {
        form,
        onFinish,
        spinning
    }

}