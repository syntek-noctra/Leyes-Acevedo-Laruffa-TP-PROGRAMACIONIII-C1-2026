const Admin=require("../models/admin.model");
const Producto = require("../models/productos.model");
 const bcrypt=require("bcrypt");

const findAdminsDB=async()=>{
    console.log("HOLAAA")
    return await Admin.findAll();
};


const createAdminDB=async(admin)=>{
    const complejidad=12;
    const sal=await bcrypt.genSalt(complejidad,"b");
    const passwordHash= await bcrypt.hash(admin.contraseña,sal)
    return await Admin.create({...admin,password:passwordHash});
};

const buscarAdminPorEmailDB=async(email)=>{
    return await Admin.findOne({where:{email}});
}


module.exports={
    findAdminsDB,
    createAdminDB,
    buscarAdminPorEmailDB
};