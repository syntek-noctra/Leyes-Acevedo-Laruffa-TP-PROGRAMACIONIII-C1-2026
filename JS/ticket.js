console.log(window.jspdf);
history.pushState(null, null, location.href);

window.onpopstate = function () {
    window.location.href = "./bienvenida.html";
};

window.onlo

const { jsPDF } = window.jspdf;



const ticket = JSON.parse(localStorage.getItem("ticket"));
console.log("que tiene ticket?,",ticket)
ticket.productos.forEach(producto => {
    console.log("cuando entro al foreach muestro", ticket.productos, producto)
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio}</td>
        <td>$${producto.precio * producto.cantidad}</td>
    `;

    document.getElementById("productosTicket").appendChild(fila);
});

document.getElementById("nombreCliente").textContent = JSON.parse(localStorage.getItem("userLocal")).name;
document.getElementById("fechaCompra").textContent = new Date().toLocaleString();
document.getElementById("numeroVenta").textContent = ticket.numeroVenta;
localStorage.removeItem("userLocal");
localStorage.removeItem("carritoDeProductos");

document.getElementById("precioTotal").textContent = ticket.total.toFixed(2);


document.getElementById("btnDescargar").addEventListener("click", async () => {

    const resultado = await Swal.fire({
        icon: "warning",
        title: "Confirmacion....",
        text: "¿Desea Generar Un Pdf con los mismos datos?",
        showCancelButton: true,
        confirmButtonText: "ACEPTAR",
        cancelButtonText: "CANCELAR",
        customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            htmlContainer: 'swal-text',
            confirmButton: 'swal-button'
        }
    });
    if (resultado.isConfirmed) {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";
        generarTicket(ticket);
        localStorage.removeItem("ticket");
        setTimeout(() => {
            window.location.href = "../HTML/bienvenida.html";
        }, 500);


    }
})

document.getElementById("btnFinalizar").addEventListener("click", () => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";
    localStorage.removeItem("ticket");
    setTimeout(() => {
        window.location.href = "../HTML/bienvenida.html";
    }, 500);
});

// EL NÚMERO DE VENTA VA A VENIR A TRAVÉS DE LA BASE DE DATOS UNA VEZ SE ENVÍE LA CONFIRMACIÓN DE COMPRA
function generarTicket({ numeroVenta, productos, total }) {

    const doc = new jsPDF();

    let y = 20;

    // ENCABEZADO

    doc.setFontSize(20);
    doc.text("G.R.I.D STORE", 20, y);

    y += 10;

    doc.setFontSize(10);

    doc.text(`Venta N° ${numeroVenta}`, 20, y);

    y += 5;

    doc.text(new Date().toLocaleString(), 20, y);

    y += 15;

    doc.line(20, y, 190, y);

    y += 10;

    // PRODUCTOS

    doc.setFontSize(12);

    productos.forEach(prod => {

        const subtotal =
            prod.precio * prod.cantidad;

        doc.text(`${prod.nombre} x${prod.cantidad}`, 20, y);

        doc.text(`$${subtotal.toFixed(2)}`, 150, y);

        y += 10;
    });

    y += 5;

    doc.line(20, y, 190, y);

    y += 10;

    doc.setFontSize(14);

    // TOTAL
    doc.text(`TOTAL: $${total.toFixed(2)}`, 20, y);

    y += 20;

    doc.setFontSize(10);

    doc.text("Gracias por su compra", 20, y);

    // Se va a descargar con el nombre "ticket"- Y número de venta / id de la bd
    doc.save(`ticket-${numeroVenta}.pdf`);
}