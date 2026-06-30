const productosContainer = document.getElementById("carritoProductos");

const modalCompra = document.getElementById("modalCompra");
const btnCancelarCompra = document.getElementById("btnCancelarCompra");
const btnConfirmarCompra = document.getElementById("btnConfirmarCompra");
const usuario=JSON.parse(localStorage.getItem("userLocal"));

// Traigo los datos de forma global en el carrito
const cantidades = JSON.parse(  localStorage.getItem("carritoDeProductos") ) || {};    
//const datos = await cargarDatos(cantidades);
/* let productosCompra = []
productosCompra =  datos; */

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
        const response=await fetch("http://localhost:3000/venta",{
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
    
    productosCompra.forEach( producto => {
      
        const divAgrupadora = document.createElement("div");
        divAgrupadora.classList.add("producto-card-div");

            const nombreElement = document.createElement("p");
            nombreElement.textContent = producto.nombre;

            const descripcionElement = document.createElement("p");
            descripcionElement.textContent = producto.descripcion;

            const imagenElement = document.createElement("img");
              imagenElement.src = producto.imagen.startsWith("http") 
                            ? producto.imagen :
                             `http://localhost:3000/imagenes/productos/${producto.imagen}`;
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


mostrarProductosFiltrados(carrito);
