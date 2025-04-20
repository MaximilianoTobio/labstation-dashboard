// src/App.tsx (actualización)
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ServiceFormPage from "./pages/admin/ServiceFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ServiceProvider>
          <Router>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rutas protegidas para usuarios normales */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Rutas protegidas para administradores */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <MainLayout>
                      <AdminDashboardPage />
                    </MainLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/services/new"
                element={
                  <AdminRoute>
                    <MainLayout>
                      <ServiceFormPage />
                    </MainLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/services/edit/:id"
                element={
                  <AdminRoute>
                    <MainLayout>
                      <ServiceFormPage />
                    </MainLayout>
                  </AdminRoute>
                }
              />

              {/* Redirigir cualquier otra ruta a la página principal */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ServiceProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
