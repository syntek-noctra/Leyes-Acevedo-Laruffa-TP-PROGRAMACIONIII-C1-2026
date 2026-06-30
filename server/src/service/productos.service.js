const {Producto}=require("../relaciones/relaciones");
const { Op } = require('sequelize');
const obtenerProductosDB=async(page=1,limit=6,tipo)=>{
    const offset=(page-1)*limit;
    const where={activo:true,
         stock: { [Op.gt]: 0},
    };
    if(tipo)where.tipo=tipo;
    return await Producto.findAndCountAll({
        where,
        limit,
        offset,
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
    return await Producto.update({activo:false},{where:{id:id}});
}


const activarProductoBD=async(id)=>{
    return await Producto.update({activo:true},{where:{id}});
}


const deleteProductoDB = async (id) => {
  return await Producto.destroy({
    where: { id },
  });
};


const buscarTodosProductosDB=async ()=>{
    return await Producto.findAll();
}



//NO IMPORTA ESTE METODO 
const crearProductosMasivoBD = async (productos) => {
    return await Producto.bulkCreate(productos);
};

module.exports={
    obtenerProductosDB,
    obtenerProductoPorIdBD,
    crearProductoBD,
    modificarProductoBD,
    desactivarProductoDB,
    activarProductoBD,
    deleteProductoDB,
    crearProductosMasivoBD,
    buscarTodosProductosDB,
}


