// src/components/layout/Header.tsx (actualización)
import { Container, Navbar, Nav, NavDropdown, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ui/ThemeToggle";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const isAdmin = user && user.role === "admin";

  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          {/* Puedes reemplazar esto con tu logo real */}
          <div className="bg-primary text-white p-2 rounded me-2">LS</div>
          <span className="fw-bold fs-4 text-primary ms-2 d-none d-sm-inline">
            LABSTATION DASHBOARD
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-3">
            <Nav.Link
              as={Link}
              to="/"
              active={window.location.pathname === "/"}
            >
              Inicio
            </Nav.Link>

            {/* Enlaces para administradores */}
            {isAdmin && (
              <Nav.Link
                as={Link}
                to="/admin"
                active={window.location.pathname.startsWith("/admin")}
              >
                Administración
              </Nav.Link>
            )}
          </Nav>
          <ThemeToggle />

          {isLoading ? (
            <Spinner animation="border" size="sm" className="ms-3" />
          ) : isAuthenticated && user ? (
            <NavDropdown
              title={`Hola, ${user.username}`}
              id="user-dropdown"
              className="ms-3"
            >
              {isAdmin && (
                <NavDropdown.Item as={Link} to="/admin">
                  Panel de Administración
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login" className="ms-3">
              Iniciar sesión
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
