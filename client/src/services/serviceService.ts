import api from "./api";
import { Service } from "../types";

// Interfaces para las peticiones y respuestas
interface ServiceResponse {
  service: Service;
  message: string;
}

interface ServicesResponse {
  services: Service[];
}

const serviceService = {
  // Obtener todos los servicios
  getAllServices: async (): Promise<Service[]> => {
    const response = await api.get<ServicesResponse>("/services");
    return response.data.services;
  },

  // Obtener un servicio por su ID
  getServiceById: async (id: string): Promise<Service> => {
    const response = await api.get<ServiceResponse>(`/services/${id}`);
    return response.data.service;
  },

  // Crear un nuevo servicio (solo para administradores)
  createService: async (serviceData: Omit<Service, "id">): Promise<Service> => {
    const response = await api.post<ServiceResponse>("/services", serviceData);
    return response.data.service;
  },

  // Actualizar un servicio existente (solo para administradores)
  updateService: async (
    id: string,
    serviceData: Partial<Service>
  ): Promise<Service> => {
    const response = await api.put<ServiceResponse>(
      `/services/${id}`,
      serviceData
    );
    return response.data.service;
  },

  // Eliminar un servicio (solo para administradores)
  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
  },
};

export default serviceService;
