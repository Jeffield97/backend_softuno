const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Visitor = sequelize.define("visitor", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_admission: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  reason_visit: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  department: {
    type: DataTypes.ENUM(
      "ADMINISTRACION",
      "PROVEEDORES",
      "SERVICIO AL CLIENTE",
      "VENTAS"
    ),
    allowNull: false,
  },
  visit_state: {
    type: DataTypes.ENUM("En curso", "Finalizado"),
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Visitor;
