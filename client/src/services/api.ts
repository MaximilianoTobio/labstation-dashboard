import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// URL base de la API (ajusta según tu entorno)
const API_URL = "http://localhost:5000/api";

// Creación de la instancia de Axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token de autenticación a las solicitudes
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores comunes
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Si el error es 401 (no autorizado), el token podría haber expirado
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // Aquí podríamos redirigir al login o disparar un evento
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
