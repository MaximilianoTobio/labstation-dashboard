import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServiceGrid from "../components/ui/ServiceGrid";
import { services } from "../data/services";

const HomePage: React.FC = () => {
  const [allServices] = useState(services);

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

      <ServiceGrid services={allServices} />
    </Container>
  );
};

export default HomePage;
