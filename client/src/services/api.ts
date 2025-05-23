import axios from "axios";

// URL base de la API (Vite expone las variables con prefijo VITE_)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Creación de la instancia de Axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Esto es crítico para que Axios envíe cookies
});

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
