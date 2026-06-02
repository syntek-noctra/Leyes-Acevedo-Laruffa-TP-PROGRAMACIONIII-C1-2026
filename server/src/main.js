const express=require("express");
const cors = require("cors");
const adminRouter=require("./routes/admin.routes");
const productoRouter=require("./routes/producto.routes")
const conexion=require("./db/sequelize");

const app=express();
app.use(cors({origin:"http://127.0.0.1:5500"})); 
app.use(express.json());


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