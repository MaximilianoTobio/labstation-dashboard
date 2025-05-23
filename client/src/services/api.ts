import axios, {
  AxiosInstance,
  //InternalAxiosRequestConfig,
  //AxiosResponse,
  //AxiosError,
} from "axios";

// URL base de la API (Vite expone las variables con prefijo VITE_)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Creación de la instancia de Axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Esto es crítico para que Axios envíe cookies
});

// Interceptor para añadir el token de autenticación a las solicitudes
//api.interceptors.request.use(
//(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
// const token = localStorage.getItem("token");
// if (token && config.headers) {
//   config.headers.Authorization = `Bearer ${token}`;
// }
// return config;
// },
//  (error: AxiosError) => Promise.reject(error)
//);

// Interceptor para manejar respuestas y errores comunes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo redirigir al login si no estamos ya en la página de login
    if (
      error.response &&
      error.response.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
