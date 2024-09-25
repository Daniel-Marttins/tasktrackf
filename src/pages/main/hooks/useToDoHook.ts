/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, notification } from "antd"
import { ToDoItem } from "../../../models/ToDoItem";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ToDoService } from "../../../services/ToDoService";

export const useToDoHook = ( 
    refreshToDoList: () => void,
    onCloseModal: () => void,
    editMode: boolean
) => {
    const [form] = Form.useForm<ToDoItem>();
    const { user } = useAuth();
    const [selectedColor, setSelectedColor] = useState<string | "">("");
    const [ spinning, setSpinning ] = useState(false);
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300'];

    const onFinish = async (values: ToDoItem) => {
        try {
            setSpinning(true);
            values = {
                ...values,
                color: selectedColor,
                ownerId: { id: user!.id }
            };

            await ToDoService().createToDoItem(values, user!.id);
            refreshToDoList();
            setSpinning(false);
            form.resetFields();
            notification.success({ message: "To-do item added successfully" });
        } catch (error) {
            console.error(error);
            setSpinning(false);
            notification.error({ message: "Error adding to-do item" });
        }
    }

    const handleColorSelect = (color: string) => {
        if (selectedColor === color) {
            setSelectedColor("");
        } else {
            setSelectedColor(color);
        }
    };

    return { form, onFinish, colors, selectedColor, handleColorSelect, spinning };

}