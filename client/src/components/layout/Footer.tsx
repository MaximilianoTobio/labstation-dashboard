import { Container } from "react-bootstrap";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-3 mt-auto border-top">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0">
            <span className="text-muted">
              &copy; {currentYear} LabStation Dashboard. Todos los derechos
              reservados.
            </span>
          </div>
          <div className="d-flex align-items-center">
            <span className="text-muted me-2">v1.0.0</span>
            <a
              href="https://github.com/MaximilianoTobio/labstation-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-muted ms-3"
            >
              GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
