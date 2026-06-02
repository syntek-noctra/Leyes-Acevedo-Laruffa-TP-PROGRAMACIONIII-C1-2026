const Producto=require("../models/productos.model");

const obtenerProductosDB=async()=>{
    return await Producto.findAll({
        where: {activo:true}
    });
};

const obtenerProductoPorIdBD= async(id)=>{
    return await Producto.findByPk(id);
}

const crearProductoBD=async(producto)=>{
    return await Producto.create(producto);
};

const modificarProductoBD=async(id,datos)=>{
    return await Producto.update(datos,{where:{id}})
}


const desactivarProductoDB=async(id)=>{
    return await Producto.update({activo:false},{where:id});
}


const activarProductoBD=async(id)=>{
    return await Producto.update({activo:true},{where:id});
}


const deleteProductoDB = async (id) => {
  return await Producto.destroy({
    where: { id },
  });
};


module.exports={
    obtenerProductosDB,
    obtenerProductoPorIdBD,
    crearProductoBD,
    modificarProductoBD,
    desactivarProductoDB,
    desactivarProductoDB,
    activarProductoBD,
    deleteProductoDB,
}
