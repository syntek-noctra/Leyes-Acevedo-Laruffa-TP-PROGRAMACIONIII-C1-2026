const {createAdmin,findAdmins, dashBoardAdminEJS, desactivarProductoAdmin,activarProductoAdmin,crearProductoEJS, editarProductoEJS}=require("../controllers/admin.controller");
const { modificarProducto } = require("../controllers/productos.controller");

const adminRouter=require("express").Router();

adminRouter.get("/",findAdmins)

adminRouter.post("/",createAdmin)


adminRouter.get("/productoNuevo",crearProductoEJS);


adminRouter.get("/dashboard",dashBoardAdminEJS);

adminRouter.get("/producto/desactivar/:id",desactivarProductoAdmin);

adminRouter.get("/producto/activar/:id",activarProductoAdmin);

adminRouter.get("/editar/:id",editarProductoEJS);

module.exports=adminRouter;