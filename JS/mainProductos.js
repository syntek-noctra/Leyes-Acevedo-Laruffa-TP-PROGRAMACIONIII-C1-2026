const imgSimbolsAsides = [
    "/IMAGES/Asides_Products_G.R.I.D.png",
    "/IMAGES/Asides_Products_G.R.I.D Inverted.png",
];
const leftSimbols = document.querySelector("#aside-simbols-left");
const rightSimbols = document.querySelector("#aside-simbols-right");
const productosContainer = document.getElementById("productos");
const btnLib = document.getElementById("btn-librerias");
const btnProg = document.getElementById("btn-programas");
const iconImg=document.getElementById("logo");
const carritoCompras=document.getElementById("cantidad-carrito");
const productosAgregados = [];

let indexSimbols = 0;

setInterval(() => {

    leftSimbols.src = imgSimbolsAsides[indexSimbols];
    rightSimbols.src = imgSimbolsAsides[indexSimbols];

    indexSimbols++;

    if(indexSimbols >= imgSimbolsAsides.length){
        indexSimbols = 0;
    }

}, 1000);

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS

const arrayCompleto = [];


// FUNCION PARA ACTULIZAR EL CARRITO DEL LOCALSTORAGE

function obtenerDatosCarrito(){
    const carrito =
        JSON.parse(localStorage.getItem("carritoDeProductos")) || {};

    return carrito
}

function actualizarCarrito(){

    carritoCompras.replaceChildren();

    const carrito = obtenerDatosCarrito();

    const total = Object.values(carrito)
        .reduce((acc, cantidad) => acc + cantidad, 0);

    carritoCompras.append(total);
}


function sumarACarrito(producto,productosAgregados,stockElement){
    // producto.stock -= 1;
    // stockElement.textContent = "STOCK: " + producto.stock;
    // productosAgregados.push(producto);
    // console.log("CARRITO: "+ productosAgregados);
    // actualizarCarrito()
    // FUNCIÓN DE SUMAR MODIFICADA PARA ALMACENAR PROD EN EL CARRITO DE LOCALSTORAGE
    // console.log("stock seleccionado", producto.stock);
    
    // producto.stock -= 1;
    // stockElement.textContent = "STOCK: " + producto.stock;

    // const carrito = JSON.parse(localStorage.getItem("carritoDeProductos")) || [];

    

    // carrito.push(producto);

    // localStorage.setItem(
    //     "carritoDeProductos",
    //     JSON.stringify(carrito)
    // );

    // actualizarCarrito();
    producto.stock -= 1;
    stockElement.textContent = "STOCK: " + producto.stock;

    const carrito =
        JSON.parse(localStorage.getItem("carritoDeProductos")) || {};

    if (carrito[producto.id]) {
        carrito[producto.id]++;
    } else {
        carrito[producto.id] = 1;
    }

    localStorage.setItem(
        "carritoDeProductos",
        JSON.stringify(carrito)
    );

    actualizarCarrito();
}

async function cargarDatos() {
    const response = await fetch("http://localhost:3000/producto/");
    const datos = await response.json();

    arrayCompleto.push(...datos);

    //console.log("array completo", arrayCompleto);

    return datos;
}

async function filtrarProductos(tipoProducto) {
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
    /*console.log("productos filtrados", productosFiltrados);*/
    }

    return productosFiltrados;

}

async function mostrarProductosFiltrados( arrayProductosFiltrados ){
    
    const carrito = obtenerDatosCarrito();
    console.log("carrito en main producto", carrito)

    arrayProductosFiltrados.forEach( producto => {
        console.log(producto.agregado);
        const divAgrupadora = document.createElement("div");
        divAgrupadora.classList.add("producto-card-div");

            const nombreElement = document.createElement("p");
            nombreElement.textContent = producto.nombre;

            const descripcionElement = document.createElement("p");
            descripcionElement.textContent = producto.descripcion;

            const imagenElement = document.createElement("img");
            imagenElement.src = producto.imagen;
            const stockElement = document.createElement("p");
            stockElement.textContent = "STOCK: " + producto.stock;
            const botonAgregar = document.createElement("button");
            botonAgregar.textContent = "++++ADD++++";
            botonAgregar.classList.add("boton-add")
            const divBotonesCarrito = document.createElement("div");
            divBotonesCarrito.classList.add("div-botones-carrito")
            const botonSumar=document.createElement("button");
            botonSumar.textContent="+";
            const botonRestar = document.createElement("button");
            botonRestar.textContent="-";
             const cantidadSeleccionadaElement = document.createElement("p");
            cantidadSeleccionadaElement.textContent=`${carrito[producto.id]}`;

            const cantidadSeleccionada = carrito[producto.id] || 0;
            const stockDisponible = producto.stock - cantidadSeleccionada;

            console.log("existe en el local?", carrito[producto.id])
            if(carrito[producto.id] !== undefined){
                divAgrupadora.append(
                    divBotonesCarrito,
                    nombreElement, 
                    descripcionElement,
                    imagenElement,
                    
                ) 
            }else{
                divAgrupadora.append(
                    nombreElement, 
                    descripcionElement,
                    imagenElement,
                    botonAgregar
                    ) 
            }
               
            divBotonesCarrito.append(botonRestar,cantidadSeleccionadaElement, botonSumar);
        
            productosContainer.appendChild(divAgrupadora)

        
            botonAgregar.addEventListener("click", () => {

                const carritoActual =
                    obtenerDatosCarrito();

                const cantidadActual =
                    carritoActual[producto.id] || 0;

                if (cantidadActual < producto.stock) {

                    producto.agregado = true;

                    divAgrupadora.classList.add(
                        "card-seleccionada"
                    );

                    sumarACarrito(
                        producto,
                        productosAgregados,
                        stockElement
                    );

                    const carritoActualizado =
                        obtenerDatosCarrito();

                    cantidadSeleccionadaElement.textContent =
                        carritoActualizado[producto.id];

                    const stockDisponible =
                        producto.stock -
                        carritoActualizado[producto.id];

                    stockElement.textContent =
                        "STOCK: " + stockDisponible;
                }

                if (producto.agregado) {

                    botonAgregar.remove();

                    divAgrupadora.append(
                        divBotonesCarrito,
                        cantidadSeleccionadaElement
                    );
                }

            });

            botonSumar.addEventListener("click", () => {

                const carritoActual = obtenerDatosCarrito();

                const cantidadActual =
                    carritoActual[producto.id] || 0;

                if (cantidadActual < producto.stock) {

                    sumarACarrito(
                        producto,
                        productosAgregados,
                        stockElement
                    );

                    const carritoActualizado =
                        obtenerDatosCarrito();

                    cantidadSeleccionadaElement.textContent =
                        carritoActualizado[producto.id];

                    const stockDisponible =
                        producto.stock -
                        carritoActualizado[producto.id];

                    stockElement.textContent =
                        "STOCK: " + stockDisponible;
                }

            });

            botonRestar.addEventListener("click",()=>{
                
                
                //     if(productosAgregados.includes(producto)){
                //         producto.stock+=1;
                //         stockElement.textContent = "STOCK: " + producto.stock;
                //         const indice= productosAgregados.indexOf(producto);
                //         productosAgregados.splice(indice,1);
                //         console.log(productosAgregados);
                //         actualizarCarrito()
                //     }
                //     if(productosAgregados.length===0 || !productosAgregados.includes(producto)){
                //     divBotonesCarrito.remove();
                //     divAgrupadora.append(botonAgregar);
                //     divAgrupadora.classList.remove("card-seleccionada");
                // }
                // FUNCIÓN DE RESTAR MODIFICADA PARA ALMACENAR PROD EN EL CARRITO DE LOCALSTORAGE
                //  console.log("stock seleccionado", producto.stock, producto);
    
                // const carrito = JSON.parse(localStorage.getItem("carritoDeProductos")) || [];

                // const indice = carrito.findIndex(
                //     prod => prod.id === producto.id
                // );

                const carrito = obtenerDatosCarrito();

                if (!carrito[producto.id]) return;

                carrito[producto.id]--;

                if (carrito[producto.id] <= 0) {
                    delete carrito[producto.id];
                }

                localStorage.setItem(
                    "carritoDeProductos",
                    JSON.stringify(carrito)
                );

                actualizarCarrito();

                const cantidadActual =
                    carrito[producto.id] || 0;

                cantidadSeleccionadaElement.textContent =
                    cantidadActual;

                const stockDisponible =
                    producto.stock - cantidadActual;

                stockElement.textContent =
                    "STOCK: " + stockDisponible;

                if (cantidadActual === 0) {

                    divBotonesCarrito.remove();

                    cantidadSeleccionadaElement.remove();

                    divAgrupadora.append(botonAgregar);

                    divAgrupadora.classList.remove(
                        "card-seleccionada"
                    );
                }
                
                
            })

            
        });

    
}

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "LIBRERIAS"*/
btnLib.onclick = async () => {
    btnLib.classList.add("selected-btn");
    btnProg.classList.remove("selected-btn");
    productosContainer.replaceChildren();
    iconImg.src="../IMAGES/img-library.png";
/*
    const titulo = document.createElement("h2")
    titulo.textContent="Librerias";
    productosContainer.appendChild(titulo)
*/
    const prodFiltrados = await filtrarProductos("libreria");
    mostrarProductosFiltrados(prodFiltrados);
};

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "PROGRAMAS"*/
btnProg.onclick = async () => {
    btnProg.classList.add("selected-btn");
    btnLib.classList.remove("selected-btn");
    productosContainer.replaceChildren();
    iconImg.src="../IMAGES/img-program.jpg";
/*
    const titulo = document.createElement("h2")
    titulo.textContent="Programas";
    productosContainer.appendChild(titulo)
*/
    const prodFiltrados = await filtrarProductos("programa");
    mostrarProductosFiltrados(prodFiltrados);
};

if(arrayCompleto.length < 1){
    btnProg.classList.add("selected-btn");
    productosContainer.replaceChildren();
/*
    const titulo = document.createElement("h2")
    titulo.textContent="Programas";
    productosContainer.appendChild(titulo)
 */   
    const prodFiltrados = await filtrarProductos("programa");
    mostrarProductosFiltrados(prodFiltrados);
}

actualizarCarrito();