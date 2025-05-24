// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

// Rutas públicas
router.post("/register", authController.register);
router.post("/register-admin", authController.registerAdmin);
router.post("/login", authController.login);
router.post("/logout", authController.logout); // Añadir esta ruta

// Rutas protegidas
router.get("/profile", verifyToken, authController.getProfile);

// 🔐 Ruta temporal para crear usuario admin
const { User } = require("../models");
const bcrypt = require("bcrypt");

router.post("/register-admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ message: "Admin creado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear admin", error });
  }
});

module.exports = router;
