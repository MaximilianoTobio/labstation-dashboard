import { Card, Button } from "react-bootstrap";
import { Service } from "../../types";
import { getServiceIcon } from "../../utils/iconUtils";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const handleServiceClick = () => {
    // Abrir el servicio en una nueva pestaña
    window.open(service.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div className="me-3 service-icon">
            {getServiceIcon(service.icon)}
          </div>
          <Card.Title className="mb-0 fs-5">{service.name}</Card.Title>
        </div>
        <Card.Text className="text-muted small flex-grow-1">
          {service.description}
        </Card.Text>
        <Button
          variant="primary"
          onClick={handleServiceClick}
          disabled={!service.isActive}
          className="mt-2"
        >
          {service.isActive ? "Acceder" : "No disponible"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
