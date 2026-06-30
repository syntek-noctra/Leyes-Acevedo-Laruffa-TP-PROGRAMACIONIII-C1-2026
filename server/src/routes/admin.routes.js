const {createAdmin,findAdmins, dashBoardAdminEJS, desactivarProductoAdmin,activarProductoAdmin,crearProductoEJS, editarProductoEJS,crearAdmin,loginAdmin,loginAdminEJS}=require("../controllers/admin.controller");
const { modificarProducto } = require("../controllers/productos.controller");

const adminRouter=require("express").Router();

adminRouter.get("/",findAdmins)



adminRouter.get("/productoNuevo",crearProductoEJS);


adminRouter.get("/dashboard",dashBoardAdminEJS);

adminRouter.get("/producto/desactivar/:id",desactivarProductoAdmin);

adminRouter.get("/producto/activar/:id",activarProductoAdmin);

adminRouter.get("/editar/:id",editarProductoEJS);



//FORMULARIO - LOGIN 
adminRouter.post("/",crearAdmin);
adminRouter.post("/login",loginAdmin);
adminRouter.get("/login",loginAdminEJS)

module.exports=adminRouter;