const {Sequelize}=require("sequelize");

const conexion=new Sequelize ("proyectoGrid","root","admin",{
    host:"localhost",
    dialect:"mysql",
    port:"3306",
});




module.exports=conexion;

