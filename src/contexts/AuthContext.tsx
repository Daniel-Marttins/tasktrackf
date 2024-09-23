import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { User } from "../models/User";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    logado: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const SESSION_DURATION = 1 * 60 * 60 * 1000;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [logado, setLogado] = useState(false);
    const [loading, setLoading] = useState(true); // Adicionar estado de carregamento

    const login = (token: string) => {
        const decodedToken: User = jwtDecode(token);
        const expirationTime = new Date().getTime() + SESSION_DURATION;
        
        setUser(decodedToken);
        setLogado(true);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime.toString());
    };

    const logout = () => {
        setUser(null);
        setLogado(false);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");

        document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        if ("caches" in window) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }

        setTimeout(() => {
            window.location.href = "/";
            window.location.reload();
        }, 200);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedExpirationTime = localStorage.getItem("expirationTime");
    
        if (storedToken && storedExpirationTime) {
            const currentTime = new Date().getTime();
            const expirationTime = parseInt(storedExpirationTime, 10);
    
            if (currentTime < expirationTime) {
                const parsedUser: User = jwtDecode(storedToken);
                setUser(parsedUser);
                setLogado(true);
            } else {
                logout();
            }
        }
        
        setLoading(false); // Fim do carregamento após verificar o token
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, logado, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};

export { AuthContext };
