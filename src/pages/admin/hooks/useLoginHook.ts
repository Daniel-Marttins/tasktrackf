import { Form } from "antd"
import { Login } from "../../../models/Login";
import { userService } from "../../../services/UserService";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export const useLoginHook = () => {
    const [ form ] = Form.useForm<Login>();
    const { getUserByLogin } = userService();
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const onFinish = async (values: Login) => {
        try {
            const token = await getUserByLogin(values);
            if (token) {
                login(token);
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { form, onFinish };
}