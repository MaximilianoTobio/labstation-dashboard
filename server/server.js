const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize, testConnection } = require("./config/db");
const models = require("./models");
const routes = require("./routes");
const { seedServices } = require("./utils/seed");

// Cargar variables de entorno
dotenv.config();

// Inicializar app
const app = express();

// Middlewares
app.use(cors());
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
