const { obtenerVentas, obtenerVentaPorId, crearVenta, generarExcelVentas } = require("../controllers/ventas.controller");

const ventaRouter = require("express").Router();



ventaRouter.post("/",crearVenta)
ventaRouter.get("/export/excel", generarExcelVentas);
ventaRouter.get("/", obtenerVentas);
ventaRouter.get("/:id", obtenerVentaPorId);



module.exports=ventaRouter;