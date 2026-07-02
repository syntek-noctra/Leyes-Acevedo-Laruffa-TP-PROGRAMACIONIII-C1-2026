const {Venta, VentaProducto, Producto} = require("../relaciones/relaciones");

const crearVentaDB=async ({nombreUsuario,precioTotal,productos})=>{

    for(const item of productos){
        const producto= await Producto.findByPk(item.id)// nose si usar la tabla directamente o usar el service de producto y buscarlo por ahi,para que sea mas facil usamos este modo.
        if(!producto || producto.stock < item.cantidad){
            throw new Error(`Stock insuficente para el producto ${item.id} - ${producto.nombre}`);
        }
    }
    
    const nuevaVenta= await Venta.create({nombreUsuario,precioTotal});


    for (const item of productos){
        const producto= await Producto.findByPk(item.id);
        datosModificado={stock:producto.stock-item.cantidad}
        if((producto.stock-item.cantidad)===0){
            datosModificado.activo=false;
            
        }
        await Producto.update(datosModificado,{where:{id:item.id}});
    }

    const registros=productos.map(p=>({
        ventaId:nuevaVenta.id,
        productoId:p.id,
        cantidad:p.cantidad,
    }));
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

const obtenerVentaExcelDB = async () => {
    return await Venta.findAll({
        include: {
            model: Producto,
            through: { attributes: ["cantidad"] }
        },
        order: [['fecha', 'DESC']]
    });
};


module.exports={crearVentaDB,obtenerVentasDB,obtenerVentaPorIdDB, obtenerVentaExcelDB}