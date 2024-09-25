/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ToDoService } from "../services/ToDoService";
import { ToDoItem } from "../models/ToDoItem";

export const useToDoManagementHook = () => {
    const { user: token } = useAuth();
    const { getAllToDoItems } = ToDoService();
    const [ toDo, setToDo ] = useState<ToDoItem[] | null>(null);
    const [ open, setOpen ] = useState(false);
    const [ editMode, setEditMode ] = useState(false);
    const [ spinning, setSpining ] = useState(false);

    useEffect(() => {
        const getToDo = async () => {
            try {
                const toDoData: ToDoItem[] = await getAllToDoItems(token!.id);
                setToDo(toDoData);
            } catch (error) {
                console.error(error);
            }
        };

        getToDo();
    }, []);

    const getToDo = async () => {
        try {
            const toDoData: ToDoItem[] = await getAllToDoItems(token!.id);
            setToDo(toDoData);
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
        getToDo();
    }

    return {
        toDo,
        getToDo,
        open, 
        openModal, 
        closeModal,
        spinning,
        setSpining,
        editMode,
        setEditMode
    }

}