// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
              <Route path="/login" element={<LoginPage />} />
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
