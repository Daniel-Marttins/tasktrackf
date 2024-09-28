/* eslint-disable @typescript-eslint/no-unused-vars */
import { message, notification } from "antd";
import { api } from "../api/api";
import { AxiosError } from "axios";
import { ToDoItem } from "../models/ToDoItem";

export const ToDoService = () => {

    const createToDoItem = async (toDoItem: ToDoItem, id: number) => {
        try {
            const response = await api.post(`/api/to-do/create?id=${id}`, toDoItem);
            console.log(response.data);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(error);
            console.log(axiosError);

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
                    message: "Erro ao buscar tarefas do usuário",
                    description: `${axiosErrorMessage}`,
                    placement: 'topRight',
                });
                console.log(axiosError);
            } else {
                message.error("Erro de rede: verifique sua conexão.");
            }
        }
    }

    const updatedToDo = async (id: number, toDo: ToDoItem) => {
        try {
            const response = await api.put(`/api/to-do/update?id=${id}`, toDo);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
        }
    }

    const deleteToDo = async (id: number) => {
        try {
            await api.delete(`/api/to-do/delete?id=${id}`);
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                const axiosErrorMessage = axiosError.response.data === "To-do-item not found!"
                    ? "Tarefa não encontrada!"
                    : "Erro Desconhecido";
                notification.error({
                    message: "Erro ao deletar tarefa",
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
        getAllToDoItems,
        updatedToDo,
        deleteToDo
    }
}