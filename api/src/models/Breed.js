const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("breed", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    temperament: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
