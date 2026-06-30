const { DataTypes } = require("sequelize");
const conexion = require("../db/sequelize");

const Venta = conexion.define("Venta", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
  
    },
    precioTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        
    },
},{
    createdAt: false,
    updatedAt: false,
});

module.exports = Venta;