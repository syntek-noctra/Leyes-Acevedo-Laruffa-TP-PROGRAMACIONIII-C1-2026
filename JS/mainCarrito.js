
const productosContainer = document.getElementById("carritoProductos");

function mostrarProductosFiltrados( arrayProductosFiltrados ){
    // OBTENER CANTIDADES DE LOS PRODUCTOS POR ID
    const cantidades = arrayProductosFiltrados.reduce((acc, producto) => {
    acc[producto.id] = (acc[producto.id] || 0) + 1;
    return acc;
    }, {});

    console.log(cantidades);

    const productosUnicos = [
            ...new Map(
                arrayProductosFiltrados.map(producto => [producto.id, producto])
            ).values()
            ];  

    console.log(productosUnicos)

    productosUnicos.forEach( producto => {
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
            const cantidad = carrito.filter(
                p => p.id === producto.id
            ).length;
            
               
            divBotonesCarrito.append(botonRestar,botonSumar);
        
            divAgrupadora.append(
            imagenElement,
            nombreElement, 
            descripcionElement,
            cantidad,
            ) 
            productosContainer.appendChild(divAgrupadora)


            
        });
}

const carrito = JSON.parse(localStorage.getItem("carritoDeProductos")) || [];

mostrarProductosFiltrados(carrito)