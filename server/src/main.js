const express=require("express");
const cors = require("cors");
const adminRouter=require("./routes/admin.routes");
const productoRouter=require("./routes/producto.routes")
const conexion=require("./db/sequelize");

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





(async () => {
  try {
    await conexion.authenticate();
    console.log("DB conectada");

    await conexion.sync({ alter: true });
    console.log("Tablas sincronizadas");

    app.listen(3000, () => {
      console.log("Servidor en puerto 3000");
    });

  } catch (error) {
    console.log(error);
  }
})();