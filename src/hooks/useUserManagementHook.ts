import { useEffect, useState } from "react"
import { User } from "../models/User";
import { useAuth } from "../contexts/AuthContext";
import { userService } from "../services/UserService";

export const useUserManagementHook = () => {
    const { user: token, logout } = useAuth();
    const { getUserById } = userService();
    const [ user, setUser ] = useState<User | null>(null);

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

    return {
        user,
        logout
    }

}