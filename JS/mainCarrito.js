import { obtenerDatosCarrito, sumarACarrito, actualizarCarrito } from "./mainProductos.js";

const productosContainer = document.getElementById("carritoProductos");

async function cargarDatos(cantidadesLocalStorage) {
    const ids = Object.keys(cantidadesLocalStorage);
    const productos = await Promise.all(
        ids.map(async id => {
            const response = await fetch(`http://localhost:3000/producto/${id}`);
            const producto = await response.json();
            return { ...producto, cantidad: cantidadesLocalStorage[id] };
        })
    );
    return productos;
}

function calcularSubTotal(arrayDeProductos) {
    return arrayDeProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
}

async function mostrarCarrito() {
    const cantidades = obtenerDatosCarrito();
    const datos = await cargarDatos(cantidades);

    productosContainer.replaceChildren();

    datos.forEach(producto => {
        const divAgrupadora = document.createElement("div");
        divAgrupadora.classList.add("producto-card-div");

        const imagenElement = document.createElement("img");
        imagenElement.src = producto.imagen;

        const nombreElement = document.createElement("p");
        nombreElement.textContent = producto.nombre;

        const descripcionElement = document.createElement("p");
        descripcionElement.textContent = producto.descripcion;

        const cantidadElement = document.createElement("p");
        cantidadElement.textContent = `Cantidad: ${cantidades[producto.id]}`;

        const precioElement = document.createElement("p");
        precioElement.textContent = `$${producto.precio}`;

        const divBotonesCarrito = document.createElement("div");
        divBotonesCarrito.classList.add("div-botones-carrito");

        const botonSumar = document.createElement("button");
        botonSumar.textContent = "+";

        const botonRestar = document.createElement("button");
        botonRestar.textContent = "-";

        divBotonesCarrito.append(botonRestar, cantidadElement, botonSumar);

        divAgrupadora.append(imagenElement, nombreElement, descripcionElement, precioElement, divBotonesCarrito);
        productosContainer.appendChild(divAgrupadora);

        botonSumar.addEventListener("click", () => {
            const carritoActual = obtenerDatosCarrito();
            if (carritoActual[producto.id] >= producto.stock) return;
            sumarACarrito(producto);
            mostrarCarrito(); // recargás el carrito
        });

        botonRestar.addEventListener("click", () => {
            const carritoActual = obtenerDatosCarrito();
            if (!carritoActual[producto.id]) return;
            carritoActual[producto.id]--;
            if (carritoActual[producto.id] <= 0) delete carritoActual[producto.id];
            localStorage.setItem("carritoDeProductos", JSON.stringify(carritoActual));
            actualizarCarrito();
            mostrarCarrito();
        });
    });

    const totalElement = document.createElement("p");
    totalElement.textContent = `TOTAL: $${calcularSubTotal(datos)}`;
    totalElement.classList.add("totalContent");
    productosContainer.appendChild(totalElement);

    // boton confirmar compra
    const btnConfirmar = document.createElement("button");
    btnConfirmar.textContent = "Confirmar compra";
    btnConfirmar.addEventListener("click", () => {
        window.location.href = "../HTML/ticket.html";
    });
    productosContainer.appendChild(btnConfirmar);
}

mostrarCarrito();