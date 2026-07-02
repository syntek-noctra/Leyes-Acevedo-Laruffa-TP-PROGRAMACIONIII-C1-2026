const {createAdminDB,findAdminsDB, buscarAdminPorEmailDB}=require("../service/admin.service");
const { buscarTodosProductosDB, desactivarProductoDB, activarProductoBD, obtenerProductoPorIdBD } = require("../service/productos.service");
const bcrypt=require("bcrypt");




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


const crearAdmin=async(req,res)=>{
    const {nombre,email,contraseña}=req.body;
    const admin=await createAdminDB({nombre,email,contraseña});
    res.send(admin);

}

const loginAdmin=async(req,res)=>{
    const {email,password}=req.body;
    const admin=await buscarAdminPorEmailDB(email);

    console.log(admin);
    if (!admin) return res.status(401).send({ mensaje: "Email incorrecto" });
    const passwordCorrecta = await bcrypt.compare(password, admin.password);
    if (!passwordCorrecta) return res.status(401).send({ mensaje: "Contraseña incorrecta" });
    res.send({ ok: true });
 
}



const loginAdminEJS=async(req,res)=>{
    res.render("loginAdmin");
}
module.exports={findAdmins,dashBoardAdminEJS,desactivarProductoAdmin,activarProductoAdmin,crearProductoEJS,editarProductoEJS,crearAdmin,loginAdmin,loginAdminEJS};