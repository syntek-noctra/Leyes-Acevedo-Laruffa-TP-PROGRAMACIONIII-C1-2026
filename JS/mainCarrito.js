const productosContainer = document.getElementById("carritoProductos");
/* import { generarTicket } from "./ticket.js"; */
const modalCompra = document.getElementById("modalCompra");
const btnCancelarCompra = document.getElementById("btnCancelarCompra");
const btnConfirmarCompra = document.getElementById("btnConfirmarCompra");

// Traigo los datos de forma global en el carrito
const cantidades = JSON.parse(  localStorage.getItem("carritoDeProductos") ) || {};    
const datos = await cargarDatos(cantidades);
let productosCompra = []
productosCompra =  datos;

async function mostrarProductosFiltrados( cantidadesLocalStorage ){
    // OBTENER CANTIDADES DE LOS PRODUCTOS POR ID
    
    const cantidades = JSON.parse(  localStorage.getItem("carritoDeProductos") ) || {};    

    const datos= await cargarDatos(cantidades)
    console.log("datos del fetch por id",datos)
    console.log("cantidades local storage",cantidades)

    const comprarButton = document.createElement("button");
    comprarButton.textContent="COMPRAR";
    comprarButton.addEventListener("click", () => { modalCompra.showModal(); });
    btnCancelarCompra.addEventListener( "click", () => modalCompra.close() );
    btnConfirmarCompra.addEventListener( "click", async () => { 

        // const funcionPostParaEnviarTodaLaInforAlBackend= () => null;
        modalCompra.close();
        // const funcionTraerDatosDelBackendDespuesDelPost= () => null;
        // const extraigoLosDatosDeLaVentaDeLaFuncion = funcionTraerDatosDelBackendDespuesDelPost();

        generarTicket({ numeroVenta: 1, productos: datos, total: calcularSubTotal(productosCompra) });
    });
    
    datos.forEach( producto => {
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

            const divBotonesCarrito = document.createElement("div");
            divBotonesCarrito.classList.add("div-botones-carrito")
            const botonSumar=document.createElement("button");
            botonSumar.textContent="+";
            const botonRestar = document.createElement("button");
            botonRestar.textContent="-";
            const cantidadElement = document.createElement("p");
            cantidadElement.textContent = `${cantidades[producto.id]}`
            const precioElement = document.createElement("p");
            precioElement.textContent = `${[producto.precio]}`
            
               
            divBotonesCarrito.append(botonRestar,botonSumar);
        
            divAgrupadora.append(
            imagenElement,
            nombreElement, 
            descripcionElement,
            cantidadElement,
            precioElement,
            ) 
            productosContainer.appendChild(divAgrupadora)


            
        });

        const totalElement = document.createElement("p");
        totalElement.textContent = `$ ${calcularSubTotal(datos)}`;
        totalElement.classList.add("totalContent");
        productosContainer.appendChild(totalElement)
        productosContainer.appendChild(comprarButton)
}

const carrito = JSON.parse(localStorage.getItem("carritoDeProductos")) || [];

async function cargarDatos(cantidadesLocalStorage) {

    const ids = Object.keys(cantidadesLocalStorage);

    const productos = await Promise.all(

        ids.map(async id => {

            const response = await fetch( `http://localhost:3000/producto/${id}` );

            const producto = await response.json();

            return { ...producto,  cantidad: cantidadesLocalStorage[id]
            };
        })

    );

    return productos;
}

function calcularSubTotal(arrayDeProductos){
    const total = arrayDeProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    return total;
    console.log("subtotal es",total);
}


mostrarProductosFiltrados(carrito)