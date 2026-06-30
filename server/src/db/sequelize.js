const {Sequelize}=require("sequelize");

const conexion=new Sequelize ("proyecto","root","",{
    host:"localhost",
    dialect:"mysql",
    port:"3306",
});




module.exports=conexion;

