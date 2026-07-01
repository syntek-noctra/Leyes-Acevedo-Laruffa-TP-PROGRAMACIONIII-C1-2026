const {obtenerProductos,
    obtenerProductoPorId,
    modificarProducto,
    desactivarProducto,
    deleteProductos,
    crearProducto,
    activarProducto,
crearProductosMasivo}=require("../controllers/productos.controller");
const middlewareMulter = require("../../middlewares/multer");
const { validarIDMW, validarProductoACrear, validarProductoModificado } = require("../../middlewares/producto.middlewares");


const productoRouter=require("express").Router();


productoRouter.get("/",obtenerProductos);

productoRouter.get("/:id",validarIDMW,obtenerProductoPorId);


//preguntar SI ACA NECEISTO  PONER MULTER.
productoRouter.put("/:id",middlewareMulter.single("imagenProducto"),validarIDMW,validarProductoModificado,modificarProducto);

productoRouter.post("/",(req, res, next) => {
    middlewareMulter.single("imagenProducto")(req, res, (err) => {
        if (err) {
            return res.status(400).send({ 
                errores: [{ message: err.message }] 
            });
        }
        next();
    });
},validarProductoACrear,crearProducto);

productoRouter.patch("/:id/desactivar",validarIDMW,desactivarProducto);

productoRouter.patch("/:id/activar",validarIDMW,activarProducto);






productoRouter.post("/masivo", crearProductosMasivo);
module.exports=productoRouter;