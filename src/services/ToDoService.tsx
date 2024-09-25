import { message, notification } from "antd";
import { api } from "../api/api";
import { AxiosError } from "axios";
import { ToDoItem } from "../models/ToDoItem";

export const ToDoService = () => {

    const createToDoItem = async (toDoItem: ToDoItem, id: number) => {
        try {
            const response = await api.post(`/api/to-do/create?id=${id}`, toDoItem);
            return response.data;
        } catch (error) {
        }
    }

    const getAllToDoItems = async (id: number) => {
        try {
            const response = await api.get(`/api/to-do/find/all?id=${id}`);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                const axiosErrorMessage = axiosError.response.data === "User not found!" 
                ? "Usuário não encontrado."
                : "Erro Desconhecido";
                notification.error({
                    message: "Erro ao buscar usuário",
                    description: `${axiosErrorMessage}`,
                    placement: 'topRight',
                });
                console.log(axiosError);
            } else {
                message.error("Erro de rede: verifique sua conexão.");
            }
        }
    }

    return {
        createToDoItem,
        getAllToDoItems
    }
}