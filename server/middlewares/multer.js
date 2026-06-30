const multer=require("multer");



//MULTER
const middlewareMulter=multer({dest:"imagenes/productos/",
    limits:{
    fileSize:1024*1024*2,
},
fileFilter:(re,file,callback)=>{
const tipoPermitidos = ["png", "jpg", "jpeg", "webp"]
    // [tipo]/[subtipo]
    const tipo=file.mimetype.split("/")[1];

    const esImagenPermitida=tipoPermitidos.includes(tipo);
    // applicaton/json
    // image/png
    // image/jpg

    //Si pasa el filtro:
    if(esImagenPermitida){
        callback(null,true);
    }else{
        callback(new Error("El archivo no es una imagen"),false); //la callback seria como un next pero como parametros
    }
    // Si no pasa el filtro:
},
    storage: multer.diskStorage({
        filename:(req,file,callback)=>{
            callback(null,`IMG-${Date.now()}.${file.mimetype.split("/")[1]}`)
        },
        destination:(re,file,callback)=>{
            callback(null,"imagenes/productos/");
        }
    })
});


module.exports=middlewareMulter;