import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import authService from "../services/authService";

interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Al iniciar, verificamos si hay un token en localStorage
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Intentar obtener el perfil del usuario con el token almacenado
          const response = await authService.getProfile();
          setUser(response.user);
          setIsAuthenticated(true);
        } catch (err) {
          // Si hay un error, limpiar el token (podría estar expirado)
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Función para iniciar sesión
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setError(null);
      const response = await authService.login({ username, password });
      localStorage.setItem("token", response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión. Inténtalo nuevamente."
      );
      return false;
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<boolean> => {
    try {
      setError(null);
      const response = await authService.register(userData);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al registrarse. Inténtalo nuevamente."
      );
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
