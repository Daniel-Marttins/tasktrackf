import { message, notification } from "antd";
import { api } from "../api/api";
import { Login } from "../models/Login";
import { AxiosError } from "axios";

export const userService = () => {

    const getUserById = async (id: number) => {
        try {
            const response = await api.get(`/api/user/find?id=${id}`);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                const axiosErrorMessage = axiosError.response.data === "User not found" 
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
    
    const getUserByLogin = async (login: Login) => {
        try {
            const response = await api.post('/api/user/find/login', login);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                const axiosErrorMessage = axiosError.response.data === "User not found with the email provided." 
                ? "Usuário não encontrado com o email fornecido."
                : axiosError.response.data === "Incorrect password."  ? "Senha Incorreta" : "Erro Desconhecido";
                notification.error({
                    message: "Erro ao fazer login",
                    description: `${axiosErrorMessage}`,
                    placement: 'topRight',
                });
                console.log(axiosError);
            } else {
                message.error("Erro de rede: verifique sua conexão.");
            }
        }
    };

    return { getUserByLogin, getUserById };
};



