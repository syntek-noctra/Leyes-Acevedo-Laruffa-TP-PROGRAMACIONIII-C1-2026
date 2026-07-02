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

        // =========================
        // 🧾 HOJA: VENTAS
        // =========================
        sheet.addRow(["VENTAS"]);
        sheet.addRow([]);

        sheet.addRow(["ID", "Usuario", "Total", "Fecha"]);

        ventas.forEach(v => {
            sheet.addRow([
                v.id,
                v.nombreUsuario,
                v.precioTotal,
                v.fecha
            ]);
        });

        sheet.addRow([]);
        sheet.addRow([]);
        sheet.addRow([]);

        // =========================
        // 📦 DETALLE VENTAS
        // =========================
        sheet.addRow(["DETALLE VENTAS"]);
        sheet.addRow([]);

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
};

// const generarExcelVentas = async (req, res) => {
//     try {
//         // Traemos ventas con productos asociados
//         const venta = await obtenerVentaExcelDB(id);

//         const workbook = new ExcelJS.Workbook();

//         // =========================
//         // HOJA 1: VENTAS
//         // =========================
//         const sheetVentas = workbook.addWorksheet("Ventas");

//         sheetVentas.columns = [
//             { header: "ID Venta", key: "id", width: 10 },
//             { header: "Usuario", key: "nombreUsuario", width: 25 },
//             { header: "Total", key: "precioTotal", width: 15 },
//             { header: "Fecha", key: "fecha", width: 25 },
//         ];

//         ventas.forEach(v => {
//             sheetVentas.addRow({
//                 id: v.id,
//                 nombreUsuario: v.nombreUsuario,
//                 precioTotal: v.precioTotal,
//                 fecha: v.fecha,
//             });
//         });

//         // =========================
//         // HOJA 2: DETALLE VENTA
//         // =========================
//         const sheetDetalle = workbook.addWorksheet("Detalle Venta");

//         sheetDetalle.columns = [
//             { header: "ID Venta", key: "ventaId", width: 10 },
//             { header: "Usuario", key: "usuario", width: 25 },
//             { header: "Fecha", key: "fecha", width: 25 },
//             { header: "Producto", key: "producto", width: 30 },
//             { header: "Cantidad", key: "cantidad", width: 10 },
//         ];

//         ventas.forEach(v => {
//             v.Productos.forEach(p => {
//                 sheetDetalle.addRow({
//                     ventaId: v.id,
//                     usuario: v.nombreUsuario,
//                     fecha: v.fecha,
//                     producto: p.nombre,
//                     cantidad: p.VentaProducto?.cantidad || 1,
//                 });
//             });
//         });

//         // =========================
//         // EXPORTAR EXCEL
//         // =========================
//         res.setHeader(
//             "Content-Type",
//             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//         );

//         res.setHeader(
//             "Content-Disposition",
//             "attachment; filename=ventas.xlsx"
//         );

//         await workbook.xlsx.write(res);
//         res.end();

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             ok: false,
//             message: "Error generando Excel",
//             error: error.message,
//         });
//     }
// };

module.exports={crearVenta,obtenerVentaPorId,obtenerVentas, generarExcelVentas}
    
