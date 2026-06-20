const { jsPDF } = window.jspdf;

// EL NÚMERO DE VENTA VA A VENIR A TRAVÉS DE LA BASE DE DATOS UNA VEZ SE ENVÍE LA CONFIRMACIÓN DE COMPRA
export function generarTicket({ numeroVenta, productos, total }) {

    const doc = new jsPDF();

    let y = 20;

    // ENCABEZADO

    doc.setFontSize(20);
    doc.text("G.R.I.D STORE", 20, y);

    y += 10;

    doc.setFontSize(10);

    doc.text( `Venta N° ${numeroVenta}`,20, y);

    y += 5;

    doc.text( new Date().toLocaleString(), 20, y );

    y += 15;

    doc.line(20, y, 190, y);

    y += 10;

    // PRODUCTOS

    doc.setFontSize(12);

    productos.forEach(prod => {

        const subtotal =
            prod.precio * prod.cantidad;

        doc.text(`${prod.nombre} x${prod.cantidad}`,20, y);

        doc.text( `$${subtotal}`, 150, y );

        y += 10;
    });

    y += 5; 

    doc.line(20, y, 190, y);

    y += 10;

    doc.setFontSize(14);

    // TOTAL
    doc.text( `TOTAL: $${total}`, 20, y );

    y += 20;

    doc.setFontSize(10);

    doc.text( "Gracias por su compra", 20, y );

    // Se va a descargar con el nombre "ticket"- Y número de venta / id de la bd
    doc.save(`ticket-${numeroVenta}.pdf`);
}