/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import { Input } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { MdEmail } from "react-icons/md";
import Logo from "../assets/img/Logo-white.png";

export const Landing: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-between" style={{ background: "#1F2127" }}>
            <Header
                className="flex items-center justify-between w-full max-w-7xl mt-4 px-4 rounded-full shadow-md bg-slate-200"
                style={{
                    width: "98%",
                    background: "#F4F4F1",
                    padding: "6px 15px"
                }}
            >
                <div className="flex items-center justify-start w-48 h-full rounded-full">
                    <div style={{ background: "#1F2127" }} className="hidden md:flex flex-col w-20 h-full items-center justify-center rounded-full">
                        <img src={Logo} style={{ width: 40, height: 40 }} />
                    </div>
                    <h1 className="ml-3 font-bold text-xl opacity-90 logo-name">TaskTrack</h1>
                </div>
                <div className="flex items-center space-x-4 w-64">
                    <a
                        href="/register"
                        className="font-bold text-sm px-4 py-2 border border-gray-400 rounded-full text-gray-800 hover:bg-gray-100"
                    >
                        Registrar-se
                    </a>
                    <a
                        href="/login"
                        className="font-bold text-sm px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                    >
                        Login
                    </a>
                </div>
            </Header>
            <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight md:leading-normal max-w-4xl">
                    A Solução Definitiva para Organizar Suas Tarefas e Maximizar Sua Produtividade
                </h1>
                <p className="text-lg md:text-xl font-semibold mt-5 text-white opacity-60">
                    Comece agora com a TaskTrack
                </p>
                <Input
                    className="w-full md:w-96 h-11 mt-6 rounded-full px-5 font-bold"
                    style={{ color: "#8D9196" }}
                    placeholder="Comece nos informando seu email..."
                    suffix={<MdEmail />}
                />
            </div>
            <Footer className="flex flex-col items-center justify-center bg-transparent w-full p-5">
                <div className="flex flex-col items-center justify-center text-sm text-gray-400 py-6 w-full">
                    <div className="flex items-center justify-center space-x-3 mb-5 w-full">
                        <a href="https://github.com/Daniel-Marttins" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
                        </a>
                        <a href="https://www.linkedin.com/in/danielmartinsds/" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                        </a>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        &copy; 2024 TaskTrack. Todos os direitos reservados.
                    </div>
                </div>
            </Footer>
        </div>
    )
}