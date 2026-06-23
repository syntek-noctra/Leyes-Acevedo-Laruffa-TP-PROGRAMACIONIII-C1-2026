const Producto = require("../models/productos.model");
const Venta = require("../models/ventas.model");
const VentaProducto = require("../models/ventaProducto.model");


Producto.belongsToMany(Venta,{
    through:VentaProducto,
    foreignKey:"productoId",
    otherKey:"ventaId",
})


// Relación Muchos a Muchos: Venta <-> Producto
Venta.belongsToMany(Producto, {
    through: VentaProducto,
    foreignKey: "ventaId",
    otherKey: "productoId",
});

module.exports={Venta,Producto,VentaProducto};