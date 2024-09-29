import { Form, Modal } from "antd";
import { useState } from "react"
import { useAuth } from "../../../contexts/AuthContext";
import { userService } from "../../../services/UserService";
import { ChangePassword } from "../../../models/ChangePassword";

export const useSettingsHook = () => {
    const [ form ] = Form.useForm<ChangePassword>();
    const [ open, setOpen ] = useState(false);
    const { user, logout } = useAuth();
    const { deleteUser, updatePassword } = userService();
    const [spinning, setSpinning] = useState(false);

    const onFinish = async (values: ChangePassword) => {
        try {
            const passwordChanged = await updatePassword(user!.id, values);

            if (passwordChanged) {
                form.resetFields();
                Modal.success({
                    title: 'Senha alterada com sucesso!',
                    content: 'Sua senha foi alterada com sucesso. Faça o login novamente!',
                });
                setTimeout(() => {
                    logout();
                }, 1000);
            }
        } catch (error) {
            Modal.error({
                title: 'Falha ao alterar senha',
                content: `${error}`,
            });
        }
    }

    const handleDeleteUser = async () => {
        Modal.confirm({
            title: 'Excluir conta',
            content: 'Você deseja excluir sua conta?',
            okText: 'Sm',
            okType: 'danger',
            cancelText: 'Não',
            onOk: async () => {
                setSpinning(true);
                await deleteUser(user!.id);
                setTimeout(() => {
                    setSpinning(false);
                }, 5000);
                setTimeout(() => {
                    logout();
                }, 2000);
            },
            onCancel: () => {
                return;
            },
        });
    }

    const openSettings = () => {
        setOpen(true);
    }

    const closeSettings = () => {
        setOpen(false);
    }

    return {
        open,
        openSettings,
        closeSettings,
        form,
        onFinish,
        handleDeleteUser,
        spinning
    }

}