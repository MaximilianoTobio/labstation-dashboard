const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Op } = require("sequelize");

// Función para configurar cookies JWT
const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000,
    path: "/",
    domain:
      process.env.NODE_ENV === "production" ? ".labstation.dev" : undefined,
  };

  res.cookie("jwt", token, cookieOptions);
};

// Registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "El nombre de usuario o email ya está en uso",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    setTokenCookie(res, token);

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

// Registrar un administrador
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "El nombre de usuario o email ya está en uso",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      role: "admin", // Importante
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    setTokenCookie(res, token);

    res.status(201).json({
      message: "Administrador registrado correctamente",
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
    console.error("Error al registrar admin:", error);
    res.status(500).json({ message: "Error al registrar administrador" });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Usuario desactivado" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    setTokenCookie(res, token);

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

// Obtener perfil
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
  registerAdmin,
  login,
  logout,
  getProfile,
};
