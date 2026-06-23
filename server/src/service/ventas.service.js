const {Venta, VentaProducto} = require("../relaciones/relaciones");

const crearVentaDB=({nombreUsuario,precioTotal,productos})=>{
    const nuevaVenta= await Venta.create({nombreUsuario,precioTotal});

    const registros=productos.map(p=>({
        ventaId:nuevaVenta.id,
        productoId:p.id,
        cantidad:p.cantidad,
    }))
    await VentaProducto.bulkCreate(registros);
    return nuevaVenta;
}