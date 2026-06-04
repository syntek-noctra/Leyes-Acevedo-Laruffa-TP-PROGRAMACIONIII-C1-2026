const {obtenerProductosDB,
    obtenerProductoPorIdBD,
    modificarProductoBD,
    desactivarProductoDB,
    deleteProductoDB,
    crearProductoBD,
    activarProductoBD}=require("../service/productos.service");


const obtenerProductos=async (req,res)=>{
    const productos= await obtenerProductosDB();
    res.send(productos);
}    


const obtenerProductoPorId=async(req,res)=>{
    const {id}=req.params;  // == const id=req.params.id;
    const producto= await obtenerProductoPorIdBD(id);
    res.send(producto);
}

const modificarProducto=async(req,res)=>{
    const id=req.params.id;
    const {nombre,precio,imagen,tipo,activo,stock,descripcion,agregado}=req.body;
    const productoModificado=await modificarProductoBD(id,{nombre,precio,imagen,tipo,activo,stock,descripcion,agregado});
    if(productoModificado[0]!==0){
        res.send({mensaje:"Se ha modificado exitosamente"});
    }else{
        res.send({mensaje:"No se ha podido modificar"});
    }
    
}


const desactivarProducto=async(req,res)=>{
    const {id}=req.params;
    const productoDesactivado=await desactivarProductoDB(id);
    res.send(productoDesactivado);
}


const  deleteProductos=async(req,res)=>{
    const {id}=req.params;
    const eliminado=await deleteProductoDB(id);
    res.send(eliminado);
}

const crearProducto=async(req,res)=>{
    const {nombre,precio,imagen,tipo,activo,stock,descripcion,agregado}=req.body;
    const productoCreado=await crearProductoBD({nombre,precio,imagen,tipo,activo,stock,descripcion,agregado});
    res.send(productoCreado);
}


const activarProducto=async(req,res)=>{
    const {id}=req.params;
    const productoActivado=await activarProductoBD(id);
    res.send(productoActivado);
}

module.exports={obtenerProductos,
    obtenerProductoPorId,
    modificarProducto,
    desactivarProducto,
    deleteProductos,
    crearProducto,
    activarProducto,
}