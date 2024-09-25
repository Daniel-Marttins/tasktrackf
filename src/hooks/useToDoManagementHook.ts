/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ToDoService } from "../services/ToDoService";
import { ToDoItem } from "../models/ToDoItem";
import { Modal, notification } from "antd";

export const useToDoManagementHook = () => {
    const { user: token } = useAuth();
    const { getAllToDoItems, updatedToDo, deleteToDo } = ToDoService();
    const [toDo, setToDo] = useState<ToDoItem[] | null>(null);
    const [ toDoItem, setToDoItem ] = useState<ToDoItem | null>(null);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [spinning, setSpining] = useState(false);

    useEffect(() => {
        const getToDo = async () => {
            try {
                const toDoData: ToDoItem[] = await getAllToDoItems(token!.id);
                setToDo(toDoData.sort((a, b) => Number(b.favorite) - Number(a.favorite)));
            } catch (error) {
                console.error(error);
            }
        };

        getToDo();
    }, []);

    const getToDo = async () => {
        try {
            const toDoData: ToDoItem[] = await getAllToDoItems(token!.id);
            setToDo(toDoData.sort((a, b) => Number(b.favorite) - Number(a.favorite)));
        } catch (error) {
            console.error(error);
        }
    };

    const favoriteToDo = async (id: number) => {
        const toDoItem = toDo?.find(todo => todo.id === id);
        if (toDoItem) {
            setSpining(true);
            toDoItem.favorite = toDoItem.favorite === true ? false : true;
            setSpining(true);
            await updatedToDo(id, toDoItem);
            setSpining(false);
            notification.success({ message: 'Tarefa favoritada.' });
            getToDo();
        }
    }

    const deleteToDoItem = async (id: number) => {
        Modal.confirm({
            title: 'Excluir esta tarefa',
            content: 'Você deseja excluir esta tarefa?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                await deleteToDo(id);
                notification.success({ message: 'Tarefa excluída.' });
                getToDo();
            },
            onCancel: () => {
                return;
            },
        });
    }

    const selectedToDo = (id: number) => {
        const toDoItem = toDo?.find(todo => todo.id === id);
        if (toDoItem) {
            setToDoItem(toDoItem);
            setOpen(true);
            setEditMode(true);
        } else {
            setToDoItem(null);
            setOpen(false);
            setEditMode(false);
        }
    }

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
        getToDo();
    }

    return {
        toDo,
        toDoItem,
        selectedToDo,
        getToDo,
        open,
        openModal,
        closeModal,
        spinning,
        setSpining,
        editMode,
        setEditMode,
        favoriteToDo,
        deleteToDoItem
    }

}