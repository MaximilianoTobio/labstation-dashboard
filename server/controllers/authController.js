// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Op } = require("sequelize");

// Función para configurar cookies JWT
const setTokenCookie = (res, token) => {
  // Opciones para la cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000,
    path: "/",
    domain:
      process.env.NODE_ENV === "production" ? ".labstation.dev" : undefined,
  };

  // Establecer la cookie
  res.cookie("jwt", token, cookieOptions);
};

// Registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "El nombre de usuario o email ya está en uso",
      });
    }

    // Crear nuevo usuario
    const user = await User.create({
      username,
      email,
      password, // Se encriptará automáticamente gracias al hook
      firstName,
      lastName,
    });

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Establecer cookie con el token
    setTokenCookie(res, token);

    // Responder con datos del usuario (sin contraseña)
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario por nombre de usuario
    const user = await User.findOne({
      where: { username },
    });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      return res.status(403).json({
        message: "Usuario desactivado",
      });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Establecer cookie con el token
    setTokenCookie(res, token);

    // Responder con datos del usuario (sin contraseña)
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

// Cerrar sesión
const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

// Obtener perfil de usuario autenticado
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error al obtener perfil de usuario" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
};
