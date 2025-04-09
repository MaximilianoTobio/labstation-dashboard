import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import ThemeToggle from "../ui/ThemeToggle";

const Header: React.FC = () => {
  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="120"
            height="80"
            className="d-inline-block align-top me-2"
            alt="LabStation Logo"
          />
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
