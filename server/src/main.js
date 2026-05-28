const express=require("express");
const adminRouter=require("./routes/admin.routes");
const conexion=require("./db/sequelize");

const app=express();

app.use(express.json());


app.use("/",adminRouter);







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