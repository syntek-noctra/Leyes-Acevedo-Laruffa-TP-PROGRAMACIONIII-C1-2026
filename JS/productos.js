import { classProducto } from "./classProducto.js";
const btnLib = document.getElementById("btn-librerias");
const btnProg = document.getElementById("btn-programas");
const iconImg=document.getElementById("logo");
const productosContainer = document.getElementById("productos");
const carritoCompras= document.getElementById("cantidad-carrito");

// FUNCIONES 
export function obtenerDatosCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carritoDeProductos")) || {};
    return carrito
}

export function actualizarCarrito(carritoDom){

    carritoDom.replaceChildren();
    const carrito = obtenerDatosCarrito();

    const total = Object.values(carrito).reduce((acc, cantidad) => acc + cantidad, 0);

    carritoDom.append(total);
}

export function sumarACarrito(producto){

    const carrito = obtenerDatosCarrito() || {};

    const cantActual = carrito[producto.id]
        
    carrito[producto.id] = (carrito[producto.id] || 0) + 1;

    localStorage.setItem("carritoDeProductos", JSON.stringify(carrito));

    actualizarCarrito(carritoCompras);
    return carrito[producto.id];
}

export async function obtenerDatos() {
    const response = await fetch("http://localhost:3000/producto/");
    const datos = await response.json();

    return datos;
}

export async function filtrarProductos(arrayCompleto, tipoProducto) {
    const productosFiltrados = [];

    if(arrayCompleto.length < 1){
        const datos = await cargarDatos() 
        datos.forEach(producto => {
        if (producto.tipo===tipoProducto) {
            productosFiltrados.push(producto);
        }
    });
    console.log("productos filtrados", productosFiltrados);

    }else{
        arrayCompleto.forEach(producto => {
        if (producto.tipo===tipoProducto) {
            productosFiltrados.push(producto);
        }
    });

    }
    return productosFiltrados;

}

export async function mostrarProductosFiltrados( arrayProductosFiltrados ){
    
    const carrito = obtenerDatosCarrito() || {};
    console.log("carrito en main producto", carrito)

    arrayProductosFiltrados.forEach( prod => {
        const nuevoProdcuto = new classProducto({...prod});

        const {
            divAgrupadora,
            botonAgregar,
            botonSumar,
            botonRestar,
            stockElement,
            cantidadSeleccionadaElement,
            divBotonesCarrito
        } = nuevoProdcuto.createHtmlElement(carrito);

        const  cantidadSeleccionadaInicial = carrito[prod.id] || 0;


        productosContainer.appendChild(divAgrupadora)

        if(carrito[prod.id] !== undefined){
            divAgrupadora.append(divBotonesCarrito) 
        }else{
            divAgrupadora.append(botonAgregar) 
        }

        if ( cantidadSeleccionadaInicial > 0) {

            divAgrupadora.append(
                divBotonesCarrito
            );

            divAgrupadora.classList.add(
                "card-seleccionada"
            );

        } else {

            divAgrupadora.append(
                botonAgregar
            );

        }

        function actualizarVista() {

            const carritoActual = obtenerDatosCarrito() || {};

            const cantidadActual = carritoActual[prod.id] || 0;

            cantidadSeleccionadaElement.textContent = cantidadActual;

            stockElement.textContent = "STOCK: " + (prod.stock - cantidadActual);

            if (cantidadActual > 0) {
                if (!divBotonesCarrito.isConnected) {

                    botonAgregar.remove();

                    divAgrupadora.append( divBotonesCarrito );
                }

                divAgrupadora.classList.add("card-seleccionada");

            } else {
                    divBotonesCarrito.remove();
                    if (!botonAgregar.isConnected) {

                        divAgrupadora.append(botonAgregar);
                    }
                    divAgrupadora.classList.remove("card-seleccionada" );
                }
        }

        function agregarProducto() {

            const carritoActual = obtenerDatosCarrito() || {};

            const cantidadActual = carritoActual[prod.id] || 0;

            if (cantidadActual >= prod.stock) return;

            sumarACarrito(prod);

            actualizarVista();
            actualizarCarrito(carritoCompras);
        }

        function restarProducto() {

            const carritoActual = obtenerDatosCarrito() || {};

            if (!carritoActual[prod.id])
                return;

            carritoActual[prod.id]--;

            if (carritoActual[prod.id] <= 0) {

                delete carritoActual[prod.id];
            }

            localStorage.setItem( "carritoDeProductos", JSON.stringify(carritoActual) );

            actualizarCarrito(carritoCompras);

            actualizarVista();
        }
        
        botonAgregar.addEventListener(
            "click",
            agregarProducto
        );

        botonSumar.addEventListener("click",() => {
            const carrito = obtenerDatosCarrito() || {};

            const cantidadActual = carrito[prod.id] || 0;

            if(cantidadActual >= prod.stock){
                console.log("stock y cantSeleccionada", prod.stock, cantidadActual)
                return }

            const cantidadNueva = sumarACarrito(prod);
            actualizarVista();
        });

        botonRestar.addEventListener(
            "click",
            restarProducto
        );

        productosContainer.appendChild(
            divAgrupadora
        );

        
    })

}

// MUESTRA DE PRODUCTOS POR DEFAULT - CATEGORÍA "LIBRERÍA"
const datos = await obtenerDatos()
const prodFiltrados = await filtrarProductos(datos, "libreria");
btnLib.classList.add("selected-btn");
btnProg.classList.remove("selected-btn");
iconImg.src="../IMAGES/img-library.png";

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "LIBRERIAS"*/
btnLib.onclick = async () => {
    btnLib.classList.add("selected-btn");
    btnProg.classList.remove("selected-btn");
    productosContainer.replaceChildren();
    iconImg.src="../IMAGES/img-library.png";

    const prodFiltrados = await filtrarProductos(datos, "libreria");
    mostrarProductosFiltrados(prodFiltrados);
};

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "PROGRAMAS"*/
btnProg.onclick = async () => {
    btnProg.classList.add("selected-btn");
    btnLib.classList.remove("selected-btn");
    productosContainer.replaceChildren();
    iconImg.src="../IMAGES/img-program.jpg";

    const prodFiltrados = await filtrarProductos(datos, "programa");
    mostrarProductosFiltrados(prodFiltrados);
};

mostrarProductosFiltrados(prodFiltrados);
actualizarCarrito(carritoCompras)