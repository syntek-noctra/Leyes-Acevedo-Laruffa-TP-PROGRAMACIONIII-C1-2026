import CONFIG from "./config.js";

import { classProducto } from "./classProducto.js";

// ELEMENTOS DEL DOM
const imgSimbolsAsides = [
    "/IMAGES/Asides_Products_G.R.I.D.png",
    "/IMAGES/Asides_Products_G.R.I.D Inverted.png",
];
const leftSimbols = document.querySelector("#aside-simbols-left");
const rightSimbols = document.querySelector("#aside-simbols-right");
const productosContainer = document.getElementById("productos");
const btnLib = document.getElementById("btn-librerias");
const btnProg = document.getElementById("btn-programas");
const iconImg = document.getElementById("logo");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const carritoCompras = document.getElementById("cantidad-carrito");
const productosAgregados = [];

// VARIABLES GLOBALES
let tipoActual = "programa";
let indexSimbols = 0;
let pagina = 1;
let totalPaginas = 1;
let arrayCompleto = [];

// ANIMACION ASIDES
setInterval(() => {
    leftSimbols.src = imgSimbolsAsides[indexSimbols];
    rightSimbols.src = imgSimbolsAsides[indexSimbols];
    indexSimbols++;
    if (indexSimbols >= imgSimbolsAsides.length) indexSimbols = 0;
}, 1000);

// CARRITO
export function obtenerDatosCarrito() {
    return JSON.parse(localStorage.getItem("carritoDeProductos")) || {};
}

export function actualizarCarrito() {
    carritoCompras.replaceChildren();
    const carrito = obtenerDatosCarrito();
    const total = Object.values(carrito).reduce((acc, cantidad) => acc + cantidad, 0);
    carritoCompras.append(total);
}

export function sumarACarrito(producto) {
    const carrito = obtenerDatosCarrito();
    carrito[producto.id] = (carrito[producto.id] || 0) + 1;
    localStorage.setItem("carritoDeProductos", JSON.stringify(carrito));
    actualizarCarrito();
    return carrito[producto.id];
}

// FETCH CON PAGINACION Y TIPO
async function cargarDatos() {
    const url = tipoActual
        ? `${CONFIG.API_URL}${CONFIG.ENDPOINTS.PRODUCTOS}?page=${pagina}&tipo=${tipoActual}`
        : `${CONFIG.API_URL}${CONFIG.ENDPOINTS.PRODUCTOS}?page=${pagina}`;

    const response = await fetch(url);
    const datos = await response.json();
    const limit = 6;

    totalPaginas = Math.ceil(datos.count / limit);
    arrayCompleto = datos.rows;

    document.getElementById("info-pagina").textContent = `Página ${pagina} de ${totalPaginas}`;

    return arrayCompleto;
}

// MOSTRAR PRODUCTOS CON CARRITO
export async function mostrarProductosFiltrados(arrayProductosFiltrados) {
    const carrito = obtenerDatosCarrito();
    console.log(arrayProductosFiltrados.map(p => p.id));
    arrayProductosFiltrados.forEach(prod => {
        const nuevoProdcuto = new classProducto({ ...prod });

        const {
            divAgrupadora,
            botonAgregar,
            botonSumar,
            botonRestar,
            stockElement,
            precioElement,
            cantidadSeleccionadaElement,
            divBotonesCarrito
        } = nuevoProdcuto.createHtmlElement(carrito); //me retorna  todo esos elementos y me ahorro hacer el "x:x directamente pongo x"

        const cantidadSeleccionadaInicial = carrito[prod.id] || 0;

        productosContainer.appendChild(divAgrupadora);

        if (cantidadSeleccionadaInicial > 0) {
            divAgrupadora.append(divBotonesCarrito);
            divAgrupadora.classList.add("card-seleccionada");
        } else {
            divAgrupadora.append(botonAgregar);
        }

        function actualizarVista() {
            const carritoActual = obtenerDatosCarrito();
            const cantidadActual = carritoActual[prod.id] || 0;
            cantidadSeleccionadaElement.textContent = cantidadActual;
            stockElement.textContent = "STOCK: " + (prod.stock - cantidadActual);

            if (cantidadActual > 0) {
                if (!divBotonesCarrito.isConnected) {
                    botonAgregar.remove();
                    divAgrupadora.append(divBotonesCarrito);
                }
                divAgrupadora.classList.add("card-seleccionada");
            } else {
                divBotonesCarrito.remove();
                if (!botonAgregar.isConnected) {
                    divAgrupadora.append(botonAgregar);
                }
                divAgrupadora.classList.remove("card-seleccionada");
            }
        }

        function agregarProducto() {
            const carritoActual = obtenerDatosCarrito();
            const cantidadActual = carritoActual[prod.id] || 0;
            if (cantidadActual >= prod.stock) return;
            sumarACarrito(prod);
            actualizarVista();
            actualizarCarrito();
        }

        function restarProducto() {
            const carritoActual = obtenerDatosCarrito();
            if (!carritoActual[prod.id]) return;
            carritoActual[prod.id]--;
            if (carritoActual[prod.id] <= 0) delete carritoActual[prod.id];
            localStorage.setItem("carritoDeProductos", JSON.stringify(carritoActual));
            actualizarCarrito();
            actualizarVista();
        }

        botonAgregar.addEventListener("click", agregarProducto);
        botonSumar.addEventListener("click", () => {
            const carritoActual = obtenerDatosCarrito();
            const cantidadActual = carritoActual[prod.id] || 0;
            if (cantidadActual >= prod.stock) return;
            sumarACarrito(prod);
            actualizarVista();
        });
        botonRestar.addEventListener("click", restarProducto);
    });
}

// BOTONES DE CATEGORIA
btnLib.onclick = async () => {
    btnLib.classList.add("selected-btn");
    btnProg.classList.remove("selected-btn");

    iconImg.src = "../IMAGES/img-library.png";

    tipoActual = "libreria";
    pagina = 1;

    await render();
};

btnProg.onclick = async () => {
    btnProg.classList.add("selected-btn");
    btnLib.classList.remove("selected-btn");

    iconImg.src = "../IMAGES/img-program.jpg";

    tipoActual = "programa";
    pagina = 1;

    await render();
};

// BOTONES DE PAGINACION
btnSiguiente.addEventListener("click", async () => {
    if (pagina < totalPaginas) {
        pagina++;
       await render();
    }
});

btnAnterior.addEventListener("click", async () => {
    if (pagina > 1) {
        pagina--;
        await render();
    }
});
let inicializado=false;
// CARGA INICIAL
btnProg.classList.add("selected-btn");
async function render() {
    productosContainer.replaceChildren();
    const productos = await cargarDatos();
    mostrarProductosFiltrados(productos);
    actualizarCarrito();
}

render();




