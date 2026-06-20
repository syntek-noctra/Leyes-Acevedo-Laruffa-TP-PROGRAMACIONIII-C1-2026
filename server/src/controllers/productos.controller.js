const { obtenerProductosDB,
    obtenerProductoPorIdBD,
    modificarProductoBD,
    desactivarProductoDB,
    deleteProductoDB,
    crearProductoBD,
    activarProductoBD,
    crearProductosMasivoBD,} = require("../service/productos.service");


const obtenerProductos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const { tipo } = req.query;
    //preguntar como es que sabe el usuario que query poner.
    const productos = await obtenerProductosDB(page, limit, tipo);
    res.send(productos);
}


const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;  // == const id=req.params.id;
    const producto = await obtenerProductoPorIdBD(id);
    res.send(producto);
}


const modificarProducto = async (req, res) => {
    const id = req.params.id;
    const datos = { ...req.body }; // esto lo hago asi porque si en modificar desde el frontend me mandan solamente 2 parametros por ejempllo -> modifico solo precio y nombre
    //entonces me toma literal solo es 2 parametros ,si pusiera todos los parametros y pase undefined me rompe la base, ademas lo hago asi porque nose que datos me va a modifciar.
    console.log(datos.stock ,"--------------------------AAAAAAAAAAAAAAAAAAAAAA");

    if (req.file) {
        datos.imagen = req.file.filename;
    }
    const productoModificado = await modificarProductoBD(id, datos);


    if (productoModificado[0] === 0) {
        return res.status(404).send({
            mensaje: "Producto no encontrado"
        });
    }

    res.send({
        mensaje: "Se ha modificado exitosamente"
    });

}


const desactivarProducto = async (req, res) => {
    const { id } = req.params;
    const productoDesactivado = await desactivarProductoDB(id);
    res.send(productoDesactivado);
}


const deleteProductos = async (req, res) => {
    const { id } = req.params;
    const eliminado = await deleteProductoDB(id);
    res.send(eliminado);
}

const crearProducto = async (req, res) => {
    const { nombre, precio, tipo, descripcion,stock} = req.body;
    const imagen = req.file.filename;
    console.log(stock,"CREAAAAAAAAAAAAAAAAAAAAAAAAR");
    const productoCreado = await crearProductoBD({ nombre, precio, imagen, tipo, descripcion,stock });
    res.send(productoCreado);
}


const activarProducto = async (req, res) => {
    const { id } = req.params;
    const productoActivado = await activarProductoBD(id);
    res.send(productoActivado);
}


//NO  IMPORTA ESTE METODO ES DE PRUEBA EN EL POSTMAN
const crearProductosMasivo = async (req, res) => {
    const productos = req.body;
    const creados = await crearProductosMasivoBD(productos);
    res.send(creados);
};





module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    modificarProducto,
    desactivarProducto,
    deleteProductos,
    crearProducto,
    activarProducto,
    crearProductosMasivo
}