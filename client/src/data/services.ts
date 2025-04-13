import { Service } from "../types";

export const services: Service[] = [
  {
    id: "portainer",
    name: "Portainer",
    description: "Gestión visual de contenedores Docker",
    url: "https://apportainerap.labstation.dev/",
    icon: "docker",
    category: "infrastructure",
    isActive: true,
  },
  {
    id: "n8n",
    name: "n8n",
    description: "Automatización sin código",
    url: "https://apn8nap.labstation.dev/",
    icon: "automation",
    category: "automation",
    isActive: true,
  },
  {
    id: "qdrant",
    name: "Qdrant",
    description: "Motor de búsqueda vectorial",
    url: "https://appqdrant.labstation.dev/dashboard",
    icon: "search",
    category: "database",
    isActive: true,
  },
  {
    id: "minio-front",
    name: "MinIO (Frontend)",
    description: "Almacenamiento S3 compatible",
    url: "https://apminiofrontap.labstation.dev",
    icon: "storage",
    category: "storage",
    isActive: true,
  },
  {
    id: "minio-back",
    name: "MinIO (Backend)",
    description: "Almacenamiento S3 compatible",
    url: "https://apminiobackap.labstation.dev",
    icon: "storage",
    category: "storage",
    isActive: true,
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    description: "Sistema de colas de mensajería",
    url: "https://aprabbitmqap.labstation.dev",
    icon: "message",
    category: "messaging",
    isActive: true,
  },
  {
    id: "chatwoot",
    name: "Chatwoot",
    description: "Plataforma de soporte multicanal",
    url: "https://apchatwootap.labstation.dev",
    icon: "chat",
    category: "support",
    isActive: true,
  },
  {
    id: "typebot-builder",
    name: "Typebot (Builder)",
    description: "Creación de bots conversacionales",
    url: "https://apbuilderap.labstation.dev",
    icon: "bot",
    category: "bot",
    isActive: true,
  },
  /*
  {
    id: 'typebot-viewer',
    name: 'Typebot (Viewer)',
    description: 'Visualización de bots conversacionales',
    url: 'https://apviewerap.labstation.dev',
    icon: 'bot',
    category: 'bot',
    isActive: true
  },
  */
  {
    id: "evolution-api",
    name: "Evolution API",
    description: "Gateway SMS para automatizaciones",
    url: "https://apevolutionapiap.labstation.dev/manager/",
    icon: "api",
    category: "automation",
    isActive: true,
  },
  /*
  {
    id: "postgres",
    name: "PostgreSQL",
    description: "Base de datos relacional",
    url: "#", // Placeholder, actualizar si hay interfaz web
    icon: "database",
    category: "database",
    isActive: true,
  },
  */
];
