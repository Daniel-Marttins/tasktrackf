/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ToDoItem } from "../models/ToDoItem";
import { ToDoService } from "../services/ToDoService";

export const useToDoManagementHook = () => {
    const { user: token } = useAuth();
    const { getAllToDoItems, updatedToDo, deleteToDo } = ToDoService();
    const [toDo, setToDo] = useState<ToDoItem[] | null>(null);
    const [toDoItem, setToDoItem] = useState<ToDoItem | null>(null);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [spinning, setSpining] = useState(false);
    const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
    const [activeTabKey, setActiveTabKey] = useState<string>('1');

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
            await updatedToDo(id, toDoItem);
            setSpining(false);
            toDoItem.favorite === true ? notification.success({ message: 'Adicionada aos Favoritos' }) : notification.warning({ message: 'Removida dos favoritos' });
            getToDo();
        }
    }

    const openSwitchPopover = (id: number) => {
        if (openPopoverId === id) {
            setOpenPopoverId(null);
        } else {
            setOpenPopoverId(id);
        }
    };

    const switchToDoStatus = async (id: number, status: string) => {
        let toDoItem = toDo?.find(todo => todo.id === id);
        if (toDoItem) {
            toDoItem = {
                ...toDoItem,
                ownerId: { id: token!.id }
            }
            setSpining(true);
            toDoItem!.taskStatus = status;
            await updatedToDo(id, toDoItem!);
            setSpining(false);
            notification.success({ 
                message: 'Status atualizado!', 
                description: `Status : ${
                    toDoItem!.taskStatus === 'TODO' ? ' A Fazer' :
                    toDoItem!.taskStatus === 'IN_PROGRESS'? ' Em Andamento' :
                    ' Concluído'
                }` 
            });
            getToDo();
        }
    }

    const handleTabChange = (key: string) => {
        setActiveTabKey(key);
    };

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
        deleteToDoItem,
        openPopoverId, 
        openSwitchPopover,
        switchToDoStatus,
        activeTabKey,
        handleTabChange
    }

}