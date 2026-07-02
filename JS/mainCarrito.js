import CONFIG from "./config.js";

const productosContainer = document.getElementById("carritoProductos");

const modalCompra = document.getElementById("modalCompra");
const btnCancelarCompra = document.getElementById("btnCancelarCompra");
const btnConfirmarCompra = document.getElementById("btnConfirmarCompra");
const carritoCompras = document.getElementById("cantidad-carrito");
const totalElement = document.createElement("p");

// Traigo los datos de forma global en el carrito
const cantidades = JSON.parse(  localStorage.getItem("carritoDeProductos") ) || {};    
const datos = await cargarDatos(cantidades);
let productosCompra = []
productosCompra =  datos;

function obtenerDatosCarrito() {
    return JSON.parse(localStorage.getItem("carritoDeProductos")) || {};
}

function actualizarCarrito() {
    carritoCompras.replaceChildren();
    const carrito = obtenerDatosCarrito();
    const total = Object.values(carrito).reduce((acc, cantidad) => acc + cantidad, 0);
    carritoCompras.append(total);
}

function sumarACarrito(producto) {
    const carrito = obtenerDatosCarrito();
    carrito[producto.id] = (carrito[producto.id] || 0) + 1;
    localStorage.setItem("carritoDeProductos", JSON.stringify(carrito));
    actualizarCarrito();
    return carrito[producto.id];
}

async function mostrarProductosFiltrados( cantidadesLocalStorage ){
    // OBTENER CANTIDADES DE LOS PRODUCTOS POR ID
    
    const cantidades = JSON.parse(  localStorage.getItem("carritoDeProductos") ) || {};    
    
    if (Object.keys(cantidades).length === 0) {
        productosContainer.innerHTML = "";

        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay ningún producto agregado al carrito";
        mensaje.classList.add("carrito-vacio");

        productosContainer.appendChild(mensaje);
        return;
    }
    
    const productosCompra= await cargarDatos(cantidades);
    console.log("productosCompra del fetch por id",productosCompra)
    console.log("cantidades local storage",cantidades)

    //console.log(productosCompra,"------------------- PRODUCTOS COPMRA")
    const comprarButton = document.createElement("button");
    comprarButton.textContent="COMPRAR";
    comprarButton.addEventListener("click", () => { modalCompra.showModal(); });
    btnCancelarCompra.addEventListener( "click", () => modalCompra.close() );
    btnConfirmarCompra.addEventListener( "click", async () => { 
        console.log(usuario,"USUARIO------------------------")
        const productosParaEnviar=productosCompra.map(p=>({
            id:p.id,
            cantidad:p.cantidad,
        }))
        // const funcionPostParaEnviarTodaLaInforAlBackend= () => null;
        const response=await fetch(CONFIG.API_URL + CONFIG.ENDPOINTS.VENTAS, {
            method:"POST",
            headers:{"content-type" : "application/json"},
            body: JSON.stringify({
                nombreUsuario:usuario.name,
                total:calcularSubTotal(productosCompra),
                productos:productosParaEnviar,
            })
        })
     
       
      
        modalCompra.close();
          const data=await response.json();
         if (!response.ok || !data.ok) {
           
              const resultado= await Swal.fire({
                icon: "warning",
                title: "STOCK INSUFCIENTE",
                text:data.message,
                showCancelButton: true,
                confirmButtonText: "ACEPTAR",
                customClass: {
                    popup: 'swal-popup',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-button'
                }
            });
            return;
        }
        // const funcionTraerDatosDelBackendDespuesDelPost= () => null;
        // const extraigoLosDatosDeLaVentaDeLaFuncion = funcionTraerDatosDelBackendDespuesDelPost();

       
        const ticket={numeroVenta:data.ventaId,productos:productosCompra,total:calcularSubTotal(productosCompra),nombre:usuario.name};
     localStorage.removeItem("carritoDeProductos");
        localStorage.setItem("ticket",JSON.stringify(ticket));
        window.location.href = "/HTML/ticket.html";
        productosContainer.innerHTML = "";

        

/* 

        generarTicket({ numeroVenta: data.ventaId, productos: productosCompra, total: calcularSubTotal(productosCompra) });
        localStorage.removeItem("userLocal");
        localStorage.removeItem("carritoDeProductos");
         productosContainer.innerHTML = "";

         window.location.href = "../HTML/bienvenida.html"; */
    });
    
    if(datos.length < 1) {
        return productosContainer.replaceChildren("Sin productos agregados al carrito")
    }
    datos.forEach( producto => {
        console.log(producto.agregado);
        const divAgrupadora = document.createElement("div");
        divAgrupadora.classList.add("producto-card-div");

            const nombreElement = document.createElement("p");
            nombreElement.textContent = producto.nombre;

            const descripcionElement = document.createElement("p");
            descripcionElement.textContent = producto.descripcion;

            const imagenElement = document.createElement("img");
              imagenElement.src = producto.imagen.startsWith("http") 
                            ? producto.imagen :
                             `${CONFIG.API_URL}${CONFIG.ENDPOINTS.IMAGENES}/${producto.imagen}`;
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
            const deleteProductoButton = document.createElement("button");
            deleteProductoButton.textContent = "X";
        
            
               
            divBotonesCarrito.append(botonRestar,cantidadElement,botonSumar);
        
            divAgrupadora.append(
            imagenElement,
            nombreElement, 
            descripcionElement,
            divBotonesCarrito,
            precioElement            
            ) 
            productosContainer.appendChild(divAgrupadora)
            productosContainer.appendChild(deleteProductoButton)

            function actualizarVista() {
                const carritoActual = obtenerDatosCarrito();
                const cantidadActual = carritoActual[producto.id] || 0;
                cantidadElement.textContent = cantidadActual;
                stockElement.textContent = "STOCK: " + (producto.stock - cantidadActual);
                // DEBERIA MOSTRAR ESTE MSJ SI NO HAY PRODUCTOS
                if(carritoActual.length < 1) return productosContainer.replaceChildren("No hay productos seleccionados en el carrito");
                if (cantidadActual > 0) {
                    if (!divBotonesCarrito.isConnected) {
                        divAgrupadora.append(divBotonesCarrito);
                    }
                    divAgrupadora.classList.add("card-seleccionada");
                } else {
                    if(carritoActual.length < 1) return productosContainer.replaceChildren("No hay productos seleccionados en el carrito");
                    divAgrupadora.remove();
                    divBotonesCarrito.remove();
                    deleteProductoButton.remove();
                    divAgrupadora.classList.remove("card-seleccionada");
                }
            }

            function agregarProducto() {
                const carritoActual = obtenerDatosCarrito();
                const cantidadActual = carritoActual[producto.id] || 0;
                if (cantidadActual >= producto.stock) return;
                sumarACarrito(producto);
                actualizarVista();
                actualizarCarrito();
            }

            function restarProducto() {
                const carritoActual = obtenerDatosCarrito();
                if (!carritoActual[producto.id]) return;
                carritoActual[producto.id]--;
                if (carritoActual[producto.id] <= 0){
                    console.log("carrito despues de quedar en 0")
                    delete carritoActual[producto.id];
                    actualizarCarrito();
                    actualizarVista();
                    console.log("carrito actualmente tiene estas cantidades y prods", carritoActual)
                }
                localStorage.setItem("carritoDeProductos", JSON.stringify(carritoActual));
                
                actualizarCarrito();
                actualizarSubtotal(datos)
                actualizarVista();
            }
            function actualizarSubtotal(datos) {

                const carrito = obtenerDatosCarrito();

                const total = datos.reduce((acc, producto) => {

                    const cantidad = carrito[producto.id] || 0;

                    return acc + (producto.precio * cantidad);

                }, 0);

                totalElement.textContent = `$ ${total}`;
            }

            botonSumar.addEventListener("click", () => {
                const carritoActual = obtenerDatosCarrito();
                const cantidadActual = carritoActual[producto.id] || 0;
                if (cantidadActual >= producto.stock) return;
                sumarACarrito(producto);
                actualizarVista();
            });
            botonRestar.addEventListener("click", restarProducto);

            deleteProductoButton.addEventListener("click", () => {

                const carritoActual = obtenerDatosCarrito();

                delete carritoActual[producto.id];

                localStorage.setItem(
                    "carritoDeProductos",
                    JSON.stringify(carritoActual)
                );

                divAgrupadora.remove();
                deleteProductoButton.remove();

                actualizarCarrito();
                actualizarSubtotal(datos);

                if (Object.keys(carritoActual).length === 0) {

                    productosContainer.replaceChildren(
                        "No hay productos seleccionados en el carrito"
                    );
                }

            });
        actualizarVista();
        });

        const totalElement = document.createElement("p");
        totalElement.textContent = `$ ${calcularSubTotal(productosCompra).toFixed(2)}`;
        totalElement.classList.add("totalContent");
        productosContainer.appendChild(totalElement)
        productosContainer.appendChild(comprarButton)
}

const carrito = JSON.parse(localStorage.getItem("carritoDeProductos")) || [];

async function cargarDatos(cantidadesLocalStorage) {

    const ids = Object.keys(cantidadesLocalStorage);

    const productos = await Promise.all(

        ids.map(async id => {

            const response = await fetch(`${CONFIG.API_URL}${CONFIG.ENDPOINTS.PRODUCTOS}/${id}`);

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
