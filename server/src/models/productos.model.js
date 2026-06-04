const {DataTypes}=require("sequelize");
const conexion=require("../db/sequelize");


const Producto=conexion.define("Producto",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    precio:{
        type:DataTypes.FLOAT,
        allowNull:false,

    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    tipo:{
        type:DataTypes.ENUM("programa","libreria"),
        allowNull:false,
    },
    stock:{
        type:DataTypes.INTEGER,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
    agregado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
})

module.exports=Producto;