import api from "./api";

// Tipos para las peticiones y respuestas
interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };
  token: string;
  message: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const authService = {
  // Iniciar sesión
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  // Registrar un nuevo usuario
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  // Obtener perfil del usuario autenticado
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  // Cerrar sesión (sólo elimina el token en el cliente)
  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
