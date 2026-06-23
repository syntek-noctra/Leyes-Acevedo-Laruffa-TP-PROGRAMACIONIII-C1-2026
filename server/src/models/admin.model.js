const {DataTypes}=require("sequelize");
const conexion=require("../db/sequelize");

const Admin=conexion.define("Admin",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
},{
    createdAt: false,
    updatedAt: false,
});
    


module.exports=Admin;
