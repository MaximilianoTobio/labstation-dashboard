import { Container, Row, Col } from "react-bootstrap";
import ServiceCard from "./ServiceCard";
import { Service } from "../../types";

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <Container>
      <Row className="g-4">
        {services.map((service) => (
          <Col key={service.id} xs={12} sm={6} md={4} lg={3}>
            <ServiceCard service={service} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiceGrid;
