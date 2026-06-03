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
let tipoActual=null;
let indexSimbols = 0;
let pagina = 1;
let totalPaginas = 1;
setInterval(() => {

    leftSimbols.src = imgSimbolsAsides[indexSimbols];
    rightSimbols.src = imgSimbolsAsides[indexSimbols];

    indexSimbols++;

    if(indexSimbols >= imgSimbolsAsides.length){
        indexSimbols = 0;
    }

}, 1000);

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS

let arrayCompleto = [];

async function cargarDatos() {
    const response = await fetch(`http://localhost:3000/producto?page=${pagina}&tipo=${tipoActual}`);
    const datos = await response.json();

    totalPaginas=Math.ceil(datos.count/pagina)

    arrayCompleto=datos.rows;

    console.log("array completo dede fetchh", arrayCompleto);
    console.log("LENGTH  ",arrayCompleto.length);
    return arrayCompleto;
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
        
            divAgrupadora.append(
            nombreElement, 
            descripcionElement,
            imagenElement,
            ) 
            productosContainer.appendChild(divAgrupadora)
        });

    
}

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "LIBRERIAS"*/
btnLib.onclick = async () => {
    btnLib.classList.add("selected-btn");
    btnProg.classList.remove("selected-btn");
    productosContainer.replaceChildren();
    iconImg.src="../IMAGES/img-library.png";
    tipoActual="libreria";
/*
    const titulo = document.createElement("h2")
    titulo.textContent="Librerias";
    productosContainer.appendChild(titulo)
*/
    const prodFiltrados = await cargarDatos();
    mostrarProductosFiltrados(prodFiltrados);
};

/*IMPLEMENTACIÓN DE LÓGICA DE MUESTRA DE PRODUCTOS POR BOTON "PROGRAMAS"*/
btnProg.onclick = async () => {
    btnProg.classList.add("selected-btn");
    btnLib.classList.remove("selected-btn");
    productosContainer.replaceChildren();
    iconImg.src="../IMAGES/img-program.jpg";
    tipoActual="programa";
/*
    const titulo = document.createElement("h2")
    titulo.textContent="Programas";
    productosContainer.appendChild(titulo)
*/
    const prodFiltrados = await cargarDatos();
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
    tipoActual="programa";
    const prodFiltrados = await cargarDatos();
    mostrarProductosFiltrados(prodFiltrados);
}