const {Venta, VentaProducto, Producto} = require("../relaciones/relaciones");

const crearVentaDB=async ({nombreUsuario,precioTotal,productos})=>{
    const nuevaVenta= await Venta.create({nombreUsuario,precioTotal});

    const registros=productos.map(p=>({
        ventaId:nuevaVenta.id,
        productoId:p.id,
        cantidad:p.cantidad,
    }))
    await VentaProducto.bulkCreate(registros);
    return nuevaVenta;
}


const obtenerVentasDB=async()=>{
    return await Venta.findAll({include:{model:Producto,through:{attributes:["cantidad"]
    }},order:[['fecha','DESC']]});
}


const obtenerVentaPorIdDB=async(id)=>{
    return await Venta.findByPk(id,{
        include:{
        model:Producto,
        through:{attributes:["cantidad"]}}
    });

}



module.exports={crearVentaDB,obtenerVentasDB,obtenerVentaPorIdDB}