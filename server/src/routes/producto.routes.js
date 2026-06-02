const {obtenerProductos,
    obtenerProductoPorId,
    modificarProducto,
    desactivarProducto,
    deleteProductos,
    crearProducto,
    activarProducto}=require("../controllers/productos.controller");


const productoRouter=require("express").Router();


productoRouter.get("/",obtenerProductos);

productoRouter.get("/:id",obtenerProductoPorId);

productoRouter.put("/:id",modificarProducto);

productoRouter.post("/",crearProducto);

productoRouter.patch("/:id/desactivar",desactivarProducto);

productoRouter.patch("/:id/activar",activarProducto);

productoRouter.desactivarProducto
module.exports=productoRouter;