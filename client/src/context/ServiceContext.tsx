// src/context/ServiceContext.tsx (revisión)
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import serviceService from "../services/serviceService";
import { Service } from "../types";

interface ServiceContextType {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  createService: (serviceData: Omit<Service, "id">) => Promise<Service | null>;
  updateService: (
    id: string,
    serviceData: Partial<Service>
  ) => Promise<Service | null>;
  deleteService: (id: string) => Promise<boolean>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Función para obtener todos los servicios
  const fetchServices = useCallback(async () => {
    if (isLoading) return; // Evitar múltiples solicitudes simultáneas

    try {
      setIsLoading(true);
      setError(null);
      const fetchedServices = await serviceService.getAllServices();
      setServices(fetchedServices);
      setInitialized(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar los servicios");
      console.error("Error al cargar servicios:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Cargar servicios solo la primera vez
  useEffect(() => {
    if (!initialized) {
      fetchServices();
    }
  }, [initialized, fetchServices]);

  // Función para crear un nuevo servicio
  const createService = async (
    serviceData: Omit<Service, "id">
  ): Promise<Service | null> => {
    try {
      setError(null);
      const newService = await serviceService.createService(serviceData);
      setServices((prevServices) => [...prevServices, newService]);
      return newService;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear el servicio");
      console.error("Error al crear servicio:", err);
      return null;
    }
  };

  // Función para actualizar un servicio existente
  const updateService = async (
    id: string,
    serviceData: Partial<Service>
  ): Promise<Service | null> => {
    try {
      setError(null);
      const updatedService = await serviceService.updateService(
        id,
        serviceData
      );
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? updatedService : service
        )
      );
      return updatedService;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al actualizar el servicio"
      );
      console.error("Error al actualizar servicio:", err);
      return null;
    }
  };

  // Función para eliminar un servicio
  const deleteService = async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await serviceService.deleteService(id);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar el servicio");
      console.error("Error al eliminar servicio:", err);
      return false;
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        isLoading,
        error,
        fetchServices,
        createService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// Hook personalizado para usar el contexto de servicios
export const useServices = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServices debe ser usado dentro de un ServiceProvider");
  }
  return context;
};
