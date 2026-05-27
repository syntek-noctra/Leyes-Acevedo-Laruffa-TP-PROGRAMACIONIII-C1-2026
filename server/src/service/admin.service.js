const Admin=require("../models/admin.model");

const findAdminsDB=async()=>{
    console.log("HOLAAA")
    return await Admin.findAll();
};


const createAdminDB=async(admin)=>{
    return await Admin.create(admin);
};


module.exports={
    findAdminsDB,
    createAdminDB
};