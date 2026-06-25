const { crearVentaDB, obtenerVentasDB, obtenerVentaPorIdDB } = require("../service/ventas.service");

//ACA FALTA VALIDADOR PODRIA SER UN MIDDLEWARE o simplmente lo ponemos aca la validacion se puede charalar.
const crearVenta=async(req,res)=>{
    const {nombreUsuario,productos,total}=req.body;

    const nuevaVenta=await crearVentaDB({nombreUsuario,precioTotal:total,productos});
    
    res.status(200).send({ok:true,ventaId:nuevaVenta.id});

};


const obtenerVentas=async(req,res)=>{
    const ventas=await obtenerVentasDB();
    res.send(ventas);
}

const obtenerVentaPorId=async(req,res)=>{
    const {id}=req.params;
    const venta= await obtenerVentaPorIdDB(id);
    if(!venta){
        return res.status(400).send({mensaje:"Venta no encontrada"});
    }
    res.send(venta);
}

module.exports={crearVenta,obtenerVentaPorId,obtenerVentas}
    
