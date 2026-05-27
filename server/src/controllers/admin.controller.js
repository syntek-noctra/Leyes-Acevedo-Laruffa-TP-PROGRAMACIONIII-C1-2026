const {createAdminDB,findAdminsDB}=require("../service/admin.service")

const createAdmin=async(req,res)=>{
    const{nombre,email,password}=req.body;
    const admin={nombre,email,password};
    const adminCreado=await createAdminDB(admin);
    res.send(adminCreado);
};



const findAdmins=async(req,res)=>{
    console.log("HOLAAAAAAA")
    const admins=await findAdminsDB();
    console.log("HOLAA")
    res.send(admins);
};

module.exports={createAdmin,findAdmins};