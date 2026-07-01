const z = require("zod");

const validarIDMW = (req, res, next) => {
    if (req.params.id) {
        const validado = z.coerce.number().int().positive();
        const resultado = validado.safeParse(req.params.id);
        console.log(resultado);
        next();
    } else {
        res.send({ mensaje: "Faltan datos" });
    }
};

const validarProductoACrear = (req, res, next) => {
    const body = req.body;
    const productoValidador = z.object({
        nombre: z.string().min(2, "Nombre obligatorio con mas de 1 caracter."),
        precio: z.coerce.number().int().positive("El precio debe ser mayor a 0.,"),
        tipo: z.enum(["programa", "libreria"], { message: "El tipo debe ser programa o libreria." }),
        descripcion: z.string().min(5, "La descripcion es obligatoria."),
        stock: z.coerce.number().int().min(0,"Stock negativo no se permite.")
    });

    const resultado = productoValidador.safeParse({
        nombre: body.nombre,
        precio: body.precio,
        tipo: body.tipo,
        descripcion: body.descripcion,
        stock:body.stock,
    });

    if (!resultado.success) {
        return res.status(400).send({errores: resultado.error.issues});
    }

    req.body=resultado.data;
    next();


};


const validarProductoModificado=(req,res,next)=>{
    const body=req.body;
     const productoValidador = z.object({
        nombre: z.string().min(2, "Nombre obligatorio con mas de 1 caracter.").optional(),
        precio: z.coerce.number().positive("El precio debe ser mayor a 0").optional(),
        tipo: z.enum(["programa", "libreria"], { message: "El tipo debe ser programa o libreria." }).optional(),
        descripcion: z.string().min(5, "La descripcion es obligatoria.").optional(),
        stock: z.coerce.number().int().min(0,"Stock negativo no se permite.").optional(),
        activo: z.coerce.boolean().optional()
    });

    const resultado=productoValidador.safeParse({
        nombre:body.nombre,
        precio:body.precio,
        tipo:body.tipo,
        descripcion:body.descripcion,
        activo:body.activo,
        stock:body.stock,
    })    // aca podria poner productoValidador.safeParse(req.body)  ,pero lo dejo asi para entenderlo de mejor manera.


    if (!resultado.success) {
        return res.status(400).send({errores: resultado.error.errors});
    }

    req.body=resultado.data;
    next();
};


module.exports={validarIDMW,validarProductoACrear,validarProductoModificado};