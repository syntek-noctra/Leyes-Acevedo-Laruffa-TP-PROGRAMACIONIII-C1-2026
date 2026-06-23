//ACA FALTA VALIDADOR PODRIA SER UN MIDDLEWARE o simplmente lo ponemos aca la validacion se puede charalar.
const crearVenta=async(req,res)=>{
    const {nombreUsuario,productos,total}=req.body;

    const nuevaVenta=await crearVentaDB({nombreUsuario,precioTotal:total,productos});
    
    res.status(200).send({ok:true,ventaId:nuevaVenta.id});

};
    
