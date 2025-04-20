// src/pages/admin/AdminDashboardPage.tsx (con vista previa mejorada)
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Alert,
  Modal,
  Card,
} from "react-bootstrap";
import { useServices } from "../../context/ServiceContext";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { Service } from "../../types";
import { getServiceIcon } from "../../utils/iconUtils";
import { useTheme } from "../../context/ThemeContext";

const AdminDashboardPage: React.FC = () => {
  const { services, isLoading, error, fetchServices, deleteService } =
    useServices();
  const { theme } = useTheme();

  // Estado para el modal de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  // Estado para el modal de vista previa
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [serviceToPreview, setServiceToPreview] = useState<Service | null>(
    null
  );

  // Cargar los servicios al montar el componente (solo una vez)
  useEffect(() => {
    // Solo cargar si no hay servicios o si hubo un error previo
    if (services.length === 0 || error) {
      fetchServices();
    }
  }, [error]); // Solo depende de error, no de fetchServices ni services

  // Función para mostrar el modal de vista previa
  const handleShowPreviewModal = (service: Service) => {
    setServiceToPreview(service);
    setShowPreviewModal(true);
  };

  // Función para cerrar el modal de vista previa
  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
    setServiceToPreview(null);
  };

  // Función para mostrar el modal de confirmación de eliminación
  const handleShowDeleteModal = (service: Service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
    setDeleteError(null);
  };

  // Función para cerrar el modal de confirmación
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setServiceToDelete(null);
    setDeleteError(null);
  };

  // Función para confirmar la eliminación de un servicio
  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const success = await deleteService(serviceToDelete.id);
      if (success) {
        setDeleteSuccess(
          `Servicio "${serviceToDelete.name}" eliminado correctamente`
        );
        setTimeout(() => setDeleteSuccess(null), 3000); // Ocultar el mensaje después de 3 segundos
        handleCloseDeleteModal();
      } else {
        setDeleteError("No se pudo eliminar el servicio");
      }
    } catch (err) {
      setDeleteError("Error al eliminar el servicio");
      console.error("Error al eliminar servicio:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Función para manejar la recarga manual de servicios
  const handleRefresh = useCallback(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Panel de Administración</h1>
            <div>
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                Recargar
              </Button>
              <Link to="/admin/services/new">
                <Button variant="primary">
                  <FaPlus className="me-2" /> Nuevo Servicio
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">
              {error}
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-3"
                onClick={handleRefresh}
              >
                Reintentar
              </Button>
            </Alert>
          </Col>
        </Row>
      )}

      {deleteSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success">{deleteSuccess}</Alert>
          </Col>
        </Row>
      )}

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>URL</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No hay servicios registrados
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id}>
                      <td>{service.name}</td>
                      <td>{service.category}</td>
                      <td>
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-truncate d-inline-block"
                          style={{ maxWidth: "200px" }}
                        >
                          {service.url}
                        </a>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            service.isActive ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {service.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <Button
                            variant="info"
                            size="sm"
                            className="me-2"
                            onClick={() => handleShowPreviewModal(service)}
                          >
                            <FaEye />
                          </Button>
                          <Link
                            to={`/admin/services/edit/${service.id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            <FaEdit />
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleShowDeleteModal(service)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {/* Modal de vista previa del servicio */}
      <Modal show={showPreviewModal} onHide={handleClosePreviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Vista previa del servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <Card className="h-100 shadow-sm" style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3 service-icon">
                    {serviceToPreview && getServiceIcon(serviceToPreview.icon)}
                  </div>
                  <Card.Title className="mb-0 fs-5">
                    {serviceToPreview?.name}
                  </Card.Title>
                </div>
                <Card.Text
                  className={`small flex-grow-1 ${
                    theme === "dark" ? "text-light" : "text-muted"
                  }`}
                >
                  {serviceToPreview?.description}
                </Card.Text>
                <Button
                  variant={theme === "dark" ? "outline-light" : "primary"}
                  className="mt-2"
                >
                  {serviceToPreview?.isActive ? "Acceder" : "No disponible"}
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="mt-3 text-center">
            <p className="text-muted">
              Así es como se verá este servicio en el dashboard principal
              {!serviceToPreview?.isActive && (
                <span className="text-danger">
                  {" "}
                  (este servicio está inactivo y no se mostrará a los usuarios)
                </span>
              )}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePreviewModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError && <Alert variant="danger">{deleteError}</Alert>}
          <p>
            ¿Estás seguro de que deseas eliminar el servicio{" "}
            <strong>{serviceToDelete?.name}</strong>?
          </p>
          <p className="text-danger">Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboardPage;
