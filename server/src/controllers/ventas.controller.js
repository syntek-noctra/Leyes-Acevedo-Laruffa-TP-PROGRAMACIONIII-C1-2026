const ExcelJS = require("exceljs");
const { crearVentaDB, obtenerVentasDB, obtenerVentaPorIdDB, obtenerVentaExcelDB } = require("../service/ventas.service");

//ACA FALTA VALIDADOR PODRIA SER UN MIDDLEWARE o simplmente lo ponemos aca la validacion se puede charalar.
const crearVenta=async(req,res)=>{
    try{
    const {nombreUsuario,productos,total}=req.body;

    const nuevaVenta=await crearVentaDB({nombreUsuario,precioTotal:total,productos});
    
    res.status(200).send({ok:true,ventaId:nuevaVenta.id});
    }catch(error){
        if(error.message.includes('Stock insuficente')){
           return res.status(400).send({ok: false, message: error.message});
        }
        res.status(500).send({ok: false, message: error.message});
    }

};


const obtenerVentas=async(req,res)=>{
    const ventas=await obtenerVentasDB();
    res.send(ventas);
}

const obtenerVentaPorId=async(req,res)=>{
    const {id}=req.params;
    const venta= await obtenerVentaPorIdDB(id);
    if(!venta){
        return res.status(400).send({mensaje:"Venta no encontrada"});
    }
    res.send(venta);
}

const generarExcelVentas = async (req, res) => {
    try {
        const ventas = await obtenerVentasDB();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Reporte Ventas");

        sheet.addRow(["VENTAS"]);

        sheet.addRow(["ID", "Usuario", "Total", "Fecha", "Hora"]);

        ventas.forEach(v => {

            const fechaVenta = new Date(v.fecha);

            const fecha = fechaVenta.toLocaleDateString("es-AR");

            const hora =
                `${String(fechaVenta.getHours()).padStart(2,"0")}:` +
                `${String(fechaVenta.getMinutes()).padStart(2,"0")}:` +
                `${String(fechaVenta.getSeconds()).padStart(2,"0")}`;

            sheet.addRow([
                v.id,
                v.nombreUsuario,
                v.precioTotal,
                fecha,
                hora
            ]);

        });

            sheet.addRow([]);
            sheet.addRow([]);
            sheet.addRow([]);

            // =========================
            // 📦 DETALLE VENTAS
            // =========================
            sheet.addRow(["DETALLE VENTAS"]);
            sheet.addRow(["ID Venta", "Usuario", "Fecha", "Producto", "Cantidad"]);

            ventas.forEach(v => {

                v.Productos.forEach(p => {

                    sheet.addRow([
                        v.id,
                        v.nombreUsuario,
                        v.fecha,
                        p.nombre,
                        p.VentaProducto?.cantidad || 1
                    ]);

                });

            });

        // =========================
        // DESCARGA
        // =========================
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=ventas.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).send({
            ok: false,
            message: "Error generando Excel",
            error: error.message
        });
    }
}

module.exports={crearVenta,obtenerVentaPorId,obtenerVentas, generarExcelVentas}
    
