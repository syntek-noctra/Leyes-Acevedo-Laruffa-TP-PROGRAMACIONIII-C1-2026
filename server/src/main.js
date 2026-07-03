require("dotenv").config();

const express=require("express");
const cors = require("cors");

const adminRouter=require("./routes/admin.routes");
const productoRouter=require("./routes/producto.routes")


const conexion=require("./db/sequelize");
const ventaRouter = require("./routes/ventas.routes");

const app=express();
app.use(cors());

app.use("/imagenes/productos",express.static("imagenes/productos/"));
app.use("/public",express.static("public/styles/"))

app.use(express.json());

// SSR -> MOTOR DE VISTAS EJS
app.set("view engine","ejs");
// Donde van nuestras vistas
app.set("views","./vistas");

app.use("/admin",adminRouter);

app.use("/producto",productoRouter);

app.use("/venta",ventaRouter);





(async () => {
  try {
    await conexion.authenticate();
    console.log("DB conectada");

    await conexion.sync({ alter: true });
    console.log("Tablas sincronizadas");

    app.listen(process.env.PORT, () => {
      console.log("Servidor en puerto PORT",process.env.PORT);
    });

  } catch (error) {
    console.log(error);
  }
})();