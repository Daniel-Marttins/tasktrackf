/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, notification } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ToDoItem } from "../../../models/ToDoItem";
import { ToDoService } from "../../../services/ToDoService";

export const useToDoHook = (
    refreshToDoList: () => void,
    onCloseModal: () => void,
    editMode: boolean,
    toDoItem?: ToDoItem | null
) => {
    const [ form ] = Form.useForm<ToDoItem>();
    const { user } = useAuth();
    const [selectedColor, setSelectedColor] = useState<string | "">("");
    const [spinning, setSpinning] = useState(false);
    const colors = ['#FF5733', '#33FF57', '#FFC300'];
    const { updatedToDo } = ToDoService();

    const onFinish = async (values: ToDoItem) => {
        try {
            if (editMode && toDoItem) {
                setSpinning(true);
                toDoItem = {
                    ...values,
                    color: selectedColor,
                    ownerId: { id: user!.id }
                };

                await updatedToDo(toDoItem.id, toDoItem);
                setSpinning(false);
                form.resetFields();
                refreshToDoList();
                notification.success({ message: "Tarefa atualizada com sucesso!" });
            } else {
                setSpinning(true);
                values = {
                    ...values,
                    color: selectedColor,
                    ownerId: { id: user!.id }
                };

                await ToDoService().createToDoItem(values, user!.id);
                setSpinning(false);
                form.resetFields();
                refreshToDoList();
                notification.success({ message: "Tarefa adicionada com sucesso!" });
            }
        } catch (error) {
            console.error(error);
            setSpinning(false);
            notification.error({ message: "Erro ao adicionar tarefa" });
        }
    }

    const handleColorSelect = (color: string) => {
        if (selectedColor === color) {
            setSelectedColor("");
        } else {
            setSelectedColor(color);
        }
    };

    useEffect(() => {
        if (editMode && toDoItem) {
            form.setFieldsValue(toDoItem);
            setSelectedColor(toDoItem.color);
        }
    }, [editMode, toDoItem]);

    return { form, onFinish, colors, selectedColor, handleColorSelect, spinning };

}