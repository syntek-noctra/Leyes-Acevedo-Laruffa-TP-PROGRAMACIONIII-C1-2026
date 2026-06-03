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

async function cargarDatos() {
    const response = await fetch("../DATA/datos.json");
    const datos = await response.json();

    arrayCompleto.push(...datos);

    //console.log("array completo", arrayCompleto);

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
    /*console.log("productos filtrados", productosFiltrados);*/
    }

    return productosFiltrados;

}

async function mostrarProductosFiltrados( arrayProductosFiltrados ){
    

    arrayProductosFiltrados.forEach( producto => {
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
            botonAgregar.textContent = "Agregar al carrito";
        
            divAgrupadora.append(
            nombreElement, 
            descripcionElement,
            imagenElement,
            stockElement,
            botonAgregar
            ) 
            productosContainer.appendChild(divAgrupadora)

            botonAgregar.addEventListener("click", ()=>{
                if(producto.stock > 0){
                    producto.stock -= 1;
                    stockElement.textContent = "STOCK: " + producto.stock;
                    productosAgregados.push(producto);
                    console.log(productosAgregados);
                }
            })
        });

    
}

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "LIBRERIAS"*/
btnLib.onclick = async () => {
    btnLib.classList.add("selected-btn");
    btnProg.classList.remove("selected-btn");
    productosContainer.replaceChildren();
/*
    const titulo = document.createElement("h2")
    titulo.textContent="Librerias";
    productosContainer.appendChild(titulo)
*/
    const prodFiltrados = await filtrarProductos("librerias");
    mostrarProductosFiltrados(prodFiltrados);
};

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "PROGRAMAS"*/
btnProg.onclick = async () => {
    btnProg.classList.add("selected-btn");
    btnLib.classList.remove("selected-btn");
    productosContainer.replaceChildren();
/*
    const titulo = document.createElement("h2")
    titulo.textContent="Programas";
    productosContainer.appendChild(titulo)
*/
    const prodFiltrados = await filtrarProductos("programas");
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
    const prodFiltrados = await filtrarProductos("programas");
    mostrarProductosFiltrados(prodFiltrados);
}