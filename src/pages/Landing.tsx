import { Footer, Header } from "antd/es/layout/layout"
import Logo from "../assets/img/Logo-white.png"
import { Input } from "antd";
import { MdEmail } from "react-icons/md";

export const Landing: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center overflow-hidden" style={{ background: "#1F2127" }}>
            <Header
                className="flex items-center overflow-hidden justify-between mt-4 rounded-full shadow-md bg-slate-200"
                style={{
                    width: "98%",
                    background: "#F4F4F1",
                    padding: "6px 15px"
                }}
            >
                <div className="flex items-center justify-start w-52 h-full rounded-full">
                    <div style={{ background: "#1F2127" }} className="flex w-20 h-full items-center justify-center rounded-full">
                        <img src={Logo} style={{ width: 40, height: 40 }} />
                    </div>
                    <h1 className="ml-3 font-bold text-xl opacity-90 logo-name">TaskTrack</h1>
                </div>
                <div className="flex items-center justify-end w-72 h-full rounded-full">
                    <a href="/register" style={{ color: "#1F2127" }} className="font-bold flex w-1/2 h-full items-center justify-center rounded-full register-button mr-1">Registrar-se</a>
                    <div style={{ background: "#1F2127" }} className="flex w-2/5 h-full items-center justify-center rounded-full login-div">
                        <a href="/login" style={{ color: "#F4F4F1" }} className="flex items-center justify-center font-bold w-full h-full">Login</a>
                    </div>
                </div>
            </Header>
            <div className="flex-auto">
                <div className="flex flex-col w-full h-full items-center justify-center">
                    <h1 className="text-6xl font-bold text-center w-9/12" style={{ color: "#F4F4F1" }}>A Solução Definitiva para Organizar Suas Tarefas e Maximizar Sua Produtividade</h1>
                    <p className="text-xl font-semibold text-center mt-5 opacity-60" style={{ color: "#F4F4F1" }}>Começe agora com a TaskTrack</p>
                    <Input className="w-96 h-11 mt-6 rounded-full px-5 font-bold" style={{ color: "#8D9196" }} placeholder="Começe nos informando seu email..." suffix={<MdEmail />} />
                </div>
            </div>
            <Footer className="bg-transparent">
                <div className="flex flex-col w-full items-center justify-center text-sm text-gray-400 py-3">
                    <div className="flex mb-5">
                        <a href="https://github.com/Daniel-Marttins" target="_blank" className="mr-3">
                            <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
                        </a>
                        <a href="https://www.linkedin.com/in/danielmartinsds/" target="_blank" className="mr-3">
                            <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
                        </a>
                    </div>
                    &copy; 2024 TaskTrack. Todos os direitos reservados.
                </div>
            </Footer>
        </div>
    )
}