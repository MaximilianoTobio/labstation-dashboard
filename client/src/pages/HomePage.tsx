import { useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import ServiceGrid from "../components/ui/ServiceGrid";
import { useServices } from "../context/ServiceContext";

const HomePage: React.FC = () => {
  const { services, isLoading, error, fetchServices } = useServices();

  // Efecto para recargar los servicios cuando sea necesario
  useEffect(() => {
    // La carga inicial ya se maneja en el contexto, pero podríamos
    // querer recargar los servicios en ciertos escenarios
  }, []);

  return (
    <Container>
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-5 fw-bold">Panel de Servicios</h1>
          <p className="fw-bold fs-4 text-primary ms-2 d-none d-sm-inline">
            Accede a todos tus servicios auto-hosteados desde un solo lugar
          </p>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">
              {error}
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={() => fetchServices()}
              >
                Reintentar
              </button>
            </Alert>
          </Col>
        </Row>
      )}

      {isLoading ? (
        <Row className="justify-content-center">
          <Col xs="auto">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <ServiceGrid services={services} />
      )}
    </Container>
  );
};

export default HomePage;
