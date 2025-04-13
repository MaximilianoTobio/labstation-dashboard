const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Middleware para verificar el token JWT
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No se proporcionó token de autenticación" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No se proporcionó token de autenticación" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el usuario existe en la base de datos
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Usuario desactivado" });
    }

    // Adjuntar usuario al objeto de solicitud
    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }

    console.error("Error en autenticación:", error);
    res.status(500).json({ message: "Error en la autenticación" });
  }
};

// Middleware para verificar rol de administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Requiere privilegios de administrador" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
