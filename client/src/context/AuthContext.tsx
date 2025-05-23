// client/src/context/AuthContext.tsx
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
  logout: () => Promise<void>;
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

  // Al iniciar, verificamos si hay una sesión activa intentando obtener el perfil
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Solo intentar obtener el perfil del usuario si no estamos en la página de login
        if (!window.location.pathname.includes("/login")) {
          const response = await authService.getProfile();
          setUser((response as { user: User }).user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Si hay un error, el usuario no está autenticado
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
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
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      // Siempre hacemos esto aunque falle la petición
      setUser(null);
      setIsAuthenticated(false);
    }
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
