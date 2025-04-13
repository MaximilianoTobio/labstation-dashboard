const { Service } = require("../models");

// Datos de servicios predefinidos
const servicesData = [
  {
    name: "Portainer",
    description: "Gestión visual de contenedores Docker",
    url: "https://apportainerap.labstation.dev/",
    icon: "docker",
    category: "infrastructure",
    isActive: true,
    order: 1,
  },
  {
    name: "n8n",
    description: "Automatización sin código",
    url: "https://apn8nap.labstation.dev/",
    icon: "automation",
    category: "automation",
    isActive: true,
    order: 2,
  },
  {
    name: "Qdrant",
    description: "Motor de búsqueda vectorial",
    url: "https://appqdrant.labstation.dev/dashboard",
    icon: "search",
    category: "database",
    isActive: true,
    order: 3,
  },
  {
    name: "MinIO (Frontend)",
    description: "Almacenamiento S3 compatible",
    url: "https://apminiofrontap.labstation.dev",
    icon: "storage",
    category: "storage",
    isActive: true,
    order: 4,
  },
  {
    name: "MinIO (Backend)",
    description: "Almacenamiento S3 compatible",
    url: "https://apminiobackap.labstation.dev",
    icon: "storage",
    category: "storage",
    isActive: true,
    order: 5,
  },
  {
    name: "RabbitMQ",
    description: "Sistema de colas de mensajería",
    url: "https://aprabbitmqap.labstation.dev",
    icon: "message",
    category: "messaging",
    isActive: true,
    order: 6,
  },
  {
    name: "Chatwoot",
    description: "Plataforma de soporte multicanal",
    url: "https://apchatwootap.labstation.dev",
    icon: "support",
    category: "support",
    isActive: true,
    order: 7,
  },
  {
    name: "Typebot (Builder)",
    description: "Creación de bots conversacionales",
    url: "https://apbuilderap.labstation.dev",
    icon: "bot",
    category: "bot",
    isActive: true,
    order: 8,
  },
  {
    name: "Typebot (Viewer)",
    description: "Visualización de bots conversacionales",
    url: "https://apviewerap.labstation.dev",
    icon: "bot",
    category: "bot",
    isActive: true,
    order: 9,
  },
  {
    name: "Evolution API",
    description: "Gateway SMS para automatizaciones",
    url: "https://apevolutionapiap.labstation.dev/manager/",
    icon: "api",
    category: "automation",
    isActive: true,
    order: 10,
  },
  {
    name: "PostgreSQL",
    description: "Base de datos relacional",
    url: "#",
    icon: "database",
    category: "database",
    isActive: true,
    order: 11,
  },
];

// Función para sembrar la base de datos con servicios predefinidos
const seedServices = async () => {
  try {
    const count = await Service.count();

    // Solo sembrar si no hay servicios en la base de datos
    if (count === 0) {
      console.log("Sembrando servicios iniciales...");

      // Crear servicios en la base de datos
      await Service.bulkCreate(servicesData);

      console.log("Servicios iniciales creados correctamente");
    } else {
      console.log(
        "La base de datos ya contiene servicios, omitiendo la siembra"
      );
    }
  } catch (error) {
    console.error("Error al sembrar servicios:", error);
  }
};

module.exports = {
  seedServices,
};
