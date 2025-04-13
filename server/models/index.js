const User = require("./User");
const Service = require("./Service");

// Definir relaciones entre modelos si es necesario
// Por ejemplo, si quisiéramos que cada usuario pudiera tener servicios favoritos:
// User.belongsToMany(Service, { through: 'UserFavorites' });
// Service.belongsToMany(User, { through: 'UserFavorites' });

// Exportar todos los modelos
module.exports = {
  User,
  Service,
};
