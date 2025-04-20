// src/pages/admin/ServiceFormPage.tsx (revisión)
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useServices } from "../../context/ServiceContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Service } from "../../types";

const ServiceFormPage: React.FC = () => {
  const {
    createService,
    updateService,
    services,
    fetchServices,
    isLoading: isServicesLoading,
  } = useServices();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Estado del formulario
  const [formData, setFormData] = useState<Partial<Service>>({
    name: "",
    description: "",
    url: "",
    icon: "infrastructure", // valor por defecto
    category: "infrastructure", // valor por defecto
    isActive: true,
  });

  // Estados para la UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoadingService, setIsLoadingService] = useState(false);

  // Cargar datos del servicio si estamos en modo edición
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setIsLoadingService(true);

      // Buscar el servicio por id
      const serviceToEdit = services.find((s) => s.id === id);

      if (serviceToEdit) {
        setFormData({
          name: serviceToEdit.name,
          description: serviceToEdit.description,
          url: serviceToEdit.url,
          icon: serviceToEdit.icon,
          category: serviceToEdit.category,
          isActive: serviceToEdit.isActive,
        });
        setIsLoadingService(false);
      } else {
        // Si no tenemos los servicios cargados, los cargamos
        if (services.length === 0) {
          fetchServices()
            .then(() => {
              // Intentar buscar el servicio después de cargar
              const loadedService = services.find((s) => s.id === id);
              if (loadedService) {
                setFormData({
                  name: loadedService.name,
                  description: loadedService.description,
                  url: loadedService.url,
                  icon: loadedService.icon,
                  category: loadedService.category,
                  isActive: loadedService.isActive,
                });
              } else {
                setError("Servicio no encontrado");
                setTimeout(() => {
                  navigate("/admin");
                }, 2000);
              }
              setIsLoadingService(false);
            })
            .catch(() => {
              setIsLoadingService(false);
              setError("Error al cargar el servicio");
            });
        } else {
          // Si ya teníamos servicios pero no encontramos el solicitado
          setError("Servicio no encontrado");
          setIsLoadingService(false);
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        }
      }
    }
  }, [id, services, fetchServices, navigate]);

  // Manejar cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Manejar checkbox para campos booleanos
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (
      !formData.name ||
      !formData.description ||
      !formData.url ||
      !formData.category ||
      !formData.icon
    ) {
      setError("Por favor, completa todos los campos obligatorios");
      return;
    }

    // Intentar validar la URL
    try {
      new URL(formData.url);
    } catch (err) {
      setError("La URL no tiene un formato válido");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      if (isEdit && id) {
        // Actualizar servicio existente
        await updateService(id, formData);
      } else {
        // Crear nuevo servicio
        await createService(formData as Omit<Service, "id">);
      }

      // Redireccionar al dashboard de admin
      navigate("/admin");
    } catch (err) {
      console.error("Error al guardar servicio:", err);
      setError("Ha ocurrido un error al guardar el servicio");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si estamos cargando datos para edición
  if ((isEdit && isLoadingService) || isServicesLoading) {
    return (
      <Container>
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>{isEdit ? "Editar Servicio" : "Nuevo Servicio"}</h1>
            <Link to="/admin" className="btn btn-outline-secondary">
              Volver
            </Link>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>
                Nombre <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre del servicio"
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>
                Descripción <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción del servicio"
                rows={3}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUrl">
              <Form.Label>
                URL <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                required
                disabled={isSubmitting}
              />
              <Form.Text className="text-muted">
                URL completa incluyendo https://
              </Form.Text>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label>
                    Categoría <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="automation">Automatización</option>
                    <option value="database">Base de datos</option>
                    <option value="storage">Almacenamiento</option>
                    <option value="messaging">Mensajería</option>
                    <option value="infrastructure">Infraestructura</option>
                    <option value="support">Soporte</option>
                    <option value="bot">Bot</option>
                    <option value="other">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formIcon">
                  <Form.Label>
                    Icono <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="docker">Docker</option>
                    <option value="database">Base de Datos</option>
                    <option value="storage">Almacenamiento</option>
                    <option value="message">Mensajería</option>
                    <option value="automation">Automatización</option>
                    <option value="infrastructure">Infraestructura</option>
                    <option value="bot">Bot</option>
                    <option value="support">Soporte</option>
                    <option value="api">API</option>
                    <option value="search">Búsqueda</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formIsActive">
              <Form.Check
                type="checkbox"
                label="Servicio activo"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Text className="text-muted">
                Los servicios inactivos no serán visibles en el dashboard
                principal
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => navigate("/admin")}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    {isEdit ? "Actualizando..." : "Guardando..."}
                  </>
                ) : isEdit ? (
                  "Actualizar Servicio"
                ) : (
                  "Crear Servicio"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceFormPage;
