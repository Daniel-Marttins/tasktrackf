/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { User } from "../models/User";
import { useAuth } from "../contexts/AuthContext";
import { userService } from "../services/UserService";

export const useUserManagementHook = () => {
    const { user: token, logout } = useAuth();
    const { getUserById } = userService();
    const [ user, setUser ] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [spinning, setSpining] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userData: User = await getUserById(token!.id);
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        getUser();
    }, []);

    const getUser = async () => {
        try {
            const userData: User = await getUserById(token!.id);
            setUser(userData);
        } catch (error) {
            console.error(error);
        }
    };

    const selectedUser = () => {
        const userItem = user;
        if (userItem) {
            setUser(userItem);
            setOpen(true);
            setEditMode(true);
        } 
    }

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
        getUser();
    }

    return {
        user,
        logout,
        getUser,
        editMode,
        openModal,
        closeModal,
        open,
        setOpen,
        selectedUser
    }

}