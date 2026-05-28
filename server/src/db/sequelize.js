const {Sequelize}=require("sequelize");

const conexion=new Sequelize ("proyecto","root","",{
    host:"localhost",
    dialect:"mysql",
    port:"3306",
});


(async () => {
  try {
    await conexion.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports=conexion;

