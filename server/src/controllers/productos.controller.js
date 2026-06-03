const {obtenerProductosDB,
    obtenerProductoPorIdBD,
    modificarProductoBD,
    desactivarProductoDB,
    deleteProductoDB,
    crearProductoBD,
    activarProductoBD,
crearProductosMasivoBD}=require("../service/productos.service");


const obtenerProductos=async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const {tipo}=req.query;
    //preguntar como es que sabe el usuario que query poner.
    const productos= await obtenerProductosDB(page,limit,tipo);
    res.send(productos);
}    


const obtenerProductoPorId=async(req,res)=>{
    const {id}=req.params;  // == const id=req.params.id;
    const producto= await obtenerProductoPorIdBD(id);
    res.send(producto);
}

// explcaime esto const response=await fetch(`https://api.tvmaze.com/shows/${i}`) 
//porque no pude hacerlo asi yo como ese link con ese formato
const modificarProducto=async(req,res)=>{
    const id=req.params.id;
    const {nombre,precio,imagen,tipo,activo,}=req.body;
    const productoModificado=await modificarProductoBD(id,{nombre,precio,imagen,tipo,activo});
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
    const {nombre,precio,imagen,tipo,activo,descripcion}=req.body;
    const productoCreado=await crearProductoBD({nombre,precio,imagen,tipo,activo,descripcion})
    res.send(productoCreado);
}


const activarProducto=async(req,res)=>{
    const {id}=req.params;
    const productoActivado=await activarProductoBD(id);
    res.send(productoActivado);
}


//NO  IMPORTA ESTE METODO ES DE PRUEBA EN EL POSTMAN
const crearProductosMasivo = async (req, res) => {
    const productos = req.body;
    const creados = await crearProductosMasivoBD(productos);
    res.send(creados);
};

module.exports={obtenerProductos,
    obtenerProductoPorId,
    modificarProducto,
    desactivarProducto,
    deleteProductos,
    crearProducto,
    activarProducto,
    crearProductosMasivo
}