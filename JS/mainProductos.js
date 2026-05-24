const imgSimbolsAsides = [
    "/IMAGES/Asides_Products_G.R.I.D.png",
    "/IMAGES/Asides_Products_G.R.I.D Inverted.png",
];
const leftSimbols = document.querySelector("#aside-simbols-left");
const rightSimbols = document.querySelector("#aside-simbols-right");
const productosContainer = document.getElementById("productos");


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

async function cargarDatos() {
    const response = await fetch("../DATA/datos.json");
    const datos = await response.json();

    arrayCompleto.push(...datos);

    console.log("array completo", arrayCompleto);

    return datos;
}

async function filtrarProductos(tipoProducto) {
     const productosFiltrados = [];
    if(arrayCompleto.length < 1){
        const datos = await cargarDatos() 
        datos.forEach(grupo => {
        if (grupo[tipoProducto]) {
            productosFiltrados.push(...grupo[tipoProducto]);
        }
    });
    console.log("productos filtrados", productosFiltrados);

    }else{
        arrayCompleto.forEach(grupo => {
        if (grupo[tipoProducto]) {
            productosFiltrados.push(...grupo[tipoProducto]);
        }
    });
    console.log("productos filtrados", productosFiltrados);
    }

    return productosFiltrados;

}

async function mostrarProductosFiltrados( arrayProductosFiltrados ){
    const divAgrupadora = document.createElement("div");

    arrayProductosFiltrados.forEach( producto => {
            const nombreElement = document.createElement("p");
            nombreElement.textContent = producto.nombre;

            const descripcionElement = document.createElement("p");
            descripcionElement.textContent = producto.descripcion;

            const imagenElement = document.createElement("img");
            imagenElement.src = producto.imagen;
        
            divAgrupadora.append(
            nombreElement, 
            descripcionElement,
            imagenElement,
            ) 
            return divAgrupadora;
        }
    )

    productosContainer.appendChild(divAgrupadora)
}

document.getElementById("btn-librerias").onclick = async () => {
    productosContainer.replaceChildren();

    const titulo = document.createElement("h2")
    titulo.textContent="Librerias";
    productosContainer.appendChild(titulo)

    const prodFiltrados = await filtrarProductos("librerias");
    mostrarProductosFiltrados(prodFiltrados);
};

document.getElementById("btn-programas").onclick = async () => {
    productosContainer.replaceChildren();

    const titulo = document.createElement("h2")
    titulo.textContent="Programas";
    productosContainer.appendChild(titulo)

    const prodFiltrados = await filtrarProductos("programas");
    mostrarProductosFiltrados(prodFiltrados);
};

if(arrayCompleto.length < 1){
    productosContainer.replaceChildren();

    const titulo = document.createElement("h2")
    titulo.textContent="Programas";
    productosContainer.appendChild(titulo)
    
    const prodFiltrados = await filtrarProductos("programas");
    mostrarProductosFiltrados(prodFiltrados);
}