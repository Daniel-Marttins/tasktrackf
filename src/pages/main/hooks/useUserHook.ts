/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, notification, UploadFile } from "antd";
import { useAuth } from "../../../contexts/AuthContext";
import { User } from "../../../models/User";
import { useEffect, useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { resizeImage } from "../../../usecases/SystemUtils";
import { userService } from "../../../services/UserService";
import { useToDoManagementHook } from "../../../hooks/useToDoManagementHook";

export const useUserHook = (
    refreshUser: () => void,
    onCloseModal: () => void,
    editMode: boolean,
    userData?: User | null
) => {
    const [form] = Form.useForm<User>();
    const { user, login } = useAuth();
    const { updateUser } = userService();
    const [spinning, setSpinning] = useState(false);
    const [image, setImage] = useState<UploadFile | any>(null);
    const { getToDo } = useToDoManagementHook();

    const onFinish = async (values: User) => {
        try {
            if (editMode && userData) {
                setSpinning(true);
                userData = {
                    ...values,
                    imgUrl: image
                };
                await updateUser(userData.id!, userData);
                refreshUser();
                getToDo();
                onCloseModal();
                notification.success({ message: "Usuário atualizado com sucesso!" });
                form.resetFields();
            } else {
                setSpinning(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSpinning(false);
        }

    }

    useEffect(() => {
        if (editMode && userData) {
            form.setFieldsValue(userData);

            if (userData?.imgUrl) {
                setImage(userData.imgUrl);
            }
        }
    }, [editMode, userData]);

    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info && info.fileList[0]) {
            const file = info.fileList[0].originFileObj;
            resizeImage(file as File, 100, 100, (resizedDataUrl) => {
                setImage(resizedDataUrl);
            });
        } else {
            setImage(null);
        }
    };

    const handleRemove = () => {
        setImage(null);
    };

    return {
        form,
        spinning,
        onFinish,
        image,
        handleChange,
        handleRemove
    };
}