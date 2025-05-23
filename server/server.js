const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // Importación correcta
const { sequelize, testConnection } = require("./config/db");
const models = require("./models");
const routes = require("./routes");
const { seedServices } = require("./utils/seed");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");

// Cargar variables de entorno
dotenv.config();

// Inicializar app
const app = express();

// Seguridad con Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Compresión
app.use(compression());

// Logs
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por IP
  message: "Demasiadas solicitudes desde esta IP, intenta más tarde.",
});

app.use("/api/", limiter);

// Configuración de CORS con soporte para producción
const corsOptions = {
  origin:
    process.env.CLIENT_URL ||
    process.env.FRONTEND_URL ||
    "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

// Middlewares
app.use(cookieParser()); // Añadir esta línea
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Probar conexión a la base de datos
testConnection();

// Sincronizar modelos con la base de datos y sembrar datos iniciales
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados con la base de datos");

    // Sembrar datos iniciales
    await seedServices();
  } catch (error) {
    console.error("Error al sincronizar modelos:", error);
  }
})();

// Rutas
app.use("/api", routes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de LabStation Dashboard" });
});

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
