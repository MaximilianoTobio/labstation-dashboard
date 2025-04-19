// src/components/layout/Header.tsx
import { Container, Navbar, Nav, NavDropdown, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ui/ThemeToggle";

const Header: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          {/* Puedes reemplazar esto con tu logo real */}
          <div className="bg-primary text-white p-2 rounded me-2">LS</div>
          <span className="fw-bold fs-4 text-primary ms-2 d-none d-sm-inline">
            LABSTATION DASHBOARD
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-3">
            <Nav.Link href="/" active>
              Inicio
            </Nav.Link>
            {/* Puedes agregar más enlaces de navegación aquí en el futuro */}
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
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="/login" className="ms-3">
              Iniciar sesión
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
