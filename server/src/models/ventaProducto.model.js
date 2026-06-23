const { DataTypes } = require("sequelize");
const conexion = require("../db/sequelize");

const VentaProducto = conexion.define("VentaProducto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
},{
    createdAt: false,
    updatedAt: false,
});

module.exports = VentaProducto;