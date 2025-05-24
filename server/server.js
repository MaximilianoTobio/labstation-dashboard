const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
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
  max: 100,
  message: "Demasiadas solicitudes desde esta IP, intenta más tarde.",
});
app.use("/api/", limiter);

// Configuración dinámica de CORS para permitir múltiples orígenes
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://labstation.dev",
      "http://localhost:5173",
      "http://localhost:5000",
      undefined, // Para Postman, curl u otros sin Origin
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No autorizado por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

// Confianza en proxies para que las cookies "secure" funcionen con Traefik/NGINX
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Probar conexión a la base de datos
testConnection();

// Sincronizar modelos y sembrar base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados con la base de datos");
    await seedServices();
  } catch (error) {
    console.error("Error al sincronizar modelos:", error);
  }
})();

// Rutas API
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
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
