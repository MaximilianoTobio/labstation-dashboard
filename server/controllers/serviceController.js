const { Service } = require("../models");
const { Op } = require("sequelize");

// Obtener todos los servicios
const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [
        ["order", "ASC"],
        ["name", "ASC"],
      ],
    });

    res.status(200).json({ services });
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ message: "Error al obtener servicios" });
  }
};

// Obtener un servicio por ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.status(200).json({ service });
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    res.status(500).json({ message: "Error al obtener servicio" });
  }
};

// Crear un nuevo servicio
const createService = async (req, res) => {
  try {
    const { name, description, url, icon, category, isActive, order } =
      req.body;

    // Verificar si ya existe un servicio con el mismo nombre
    const existingService = await Service.findOne({ where: { name } });

    if (existingService) {
      return res
        .status(400)
        .json({ message: "Ya existe un servicio con ese nombre" });
    }

    // Crear el servicio
    const service = await Service.create({
      name,
      description,
      url,
      icon,
      category,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
    });

    res.status(201).json({
      message: "Servicio creado correctamente",
      service,
    });
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(500).json({ message: "Error al crear servicio" });
  }
};

// Actualizar un servicio existente
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, url, icon, category, isActive, order } =
      req.body;

    // Buscar el servicio
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    // Si se está cambiando el nombre, verificar que no exista otro con ese nombre
    if (name && name !== service.name) {
      const existingService = await Service.findOne({
        where: {
          name,
          id: { [Op.ne]: id }, // Excluir el servicio actual
        },
      });

      if (existingService) {
        return res
          .status(400)
          .json({ message: "Ya existe un servicio con ese nombre" });
      }
    }

    // Actualizar el servicio
    await service.update({
      name: name || service.name,
      description: description || service.description,
      url: url || service.url,
      icon: icon || service.icon,
      category: category || service.category,
      isActive: isActive !== undefined ? isActive : service.isActive,
      order: order !== undefined ? order : service.order,
    });

    res.status(200).json({
      message: "Servicio actualizado correctamente",
      service,
    });
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    res.status(500).json({ message: "Error al actualizar servicio" });
  }
};

// Eliminar un servicio
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el servicio
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    // Eliminar el servicio
    await service.destroy();

    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    res.status(500).json({ message: "Error al eliminar servicio" });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
