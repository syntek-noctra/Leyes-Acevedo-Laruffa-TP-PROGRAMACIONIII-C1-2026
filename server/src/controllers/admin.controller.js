const {createAdminDB,findAdminsDB}=require("../service/admin.service");
const { buscarTodosProductosDB, desactivarProductoDB, activarProductoBD, obtenerProductoPorIdBD } = require("../service/productos.service");

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


// EJS 

const dashBoardAdminEJS= async(req,res)=>{
    console.log("holaaaa")
    const productos= await buscarTodosProductosDB();
    res.render("productos",{productos}) //sabe a que carpeta va por la configruacion en el main.
                            // = productos: productos
}

const crearProductoEJS=async(req,res)=>{
    res.render("crearProducto");
};


const editarProductoEJS=async(req,res)=>{
    const {id}=req.params;
    const producto= await obtenerProductoPorIdBD(id);
    res.render("editarProducto",{producto});
};



const desactivarProductoAdmin=async(req,res)=>{
    const {id}=req.params;
    await desactivarProductoDB(id);
    res.redirect("/admin/dashboard");
}


const activarProductoAdmin=async(req,res)=>{
    const {id}=req.params;
    await activarProductoBD(id);
    res.redirect("/admin/dashboard");
}


module.exports={createAdmin,findAdmins,dashBoardAdminEJS,desactivarProductoAdmin,activarProductoAdmin,crearProductoEJS,editarProductoEJS};