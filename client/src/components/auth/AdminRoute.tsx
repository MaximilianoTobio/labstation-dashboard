// src/components/auth/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Mostrar un indicador de carga mientras verificamos la autenticación
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">Cargando...</div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no es admin, redirigir al dashboard
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Si es admin, mostrar los componentes hijos
  return <>{children}</>;
};

export default AdminRoute;
