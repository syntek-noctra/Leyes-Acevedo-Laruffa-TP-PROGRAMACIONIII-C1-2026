const { obtenerVentas, obtenerVentaPorId, crearVenta } = require("../controllers/ventas.controller");

const ventaRouter = require("express").Router();



ventaRouter.post("/",crearVenta)

ventaRouter.get("/",obtenerVentas);

ventaRouter.get("/:id",obtenerVentaPorId);


module.exports=ventaRouter;