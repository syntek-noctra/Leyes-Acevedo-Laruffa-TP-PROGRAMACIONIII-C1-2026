import CONFIG from "./config.js";

export class classProducto {

    constructor({
    id,
    nombre,
    descripcion,
    imagen,
    precio,
    tipo,
    stock,
    activo,
    agregado,
    createdAt,
    updatedAt,
    }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.tipo = tipo;
        this.stock = stock;
        this.activo = activo;
        this.agregado = agregado;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    createHtmlElement(carrito = {}) {
        const divAgrupadora = document.createElement("div");
        divAgrupadora.classList.add("producto-card-div");

        const nombreElement = document.createElement("p");
        nombreElement.textContent = this.nombre;

        const descripcionElement = document.createElement("p");
        descripcionElement.textContent = this.descripcion;

        const imagenElement = document.createElement("img");
        imagenElement.src = this.imagen.startsWith("http") 
                            ? this.imagen :
                             `${CONFIG.API_URL}${CONFIG.ENDPOINTS.IMAGENES}/${this.imagen}`;
        console.log(this.imagen);

        const cantidadSeleccionada = carrito[this.id] || 0;
        const stockDisponible = this.stock - cantidadSeleccionada;

        const stockElement = document.createElement("p");
        stockElement.textContent = "STOCK: " + stockDisponible;

        const precioElement = document.createElement("p");
        precioElement.textContent = "$" + this.precio;

        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "++++ADD++++";
        botonAgregar.classList.add("boton-add");

        const divBotonesCarrito = document.createElement("div");
        divBotonesCarrito.classList.add("div-botones-carrito");

        const botonSumar = document.createElement("button");
        botonSumar.textContent = "+";

        const botonRestar = document.createElement("button");
        botonRestar.textContent = "-";

        const cantidadSeleccionadaElement = document.createElement("p");
        cantidadSeleccionadaElement.textContent = cantidadSeleccionada;

        divBotonesCarrito.append(botonRestar, cantidadSeleccionadaElement, botonSumar);

        divAgrupadora.append(nombreElement, descripcionElement, imagenElement, stockElement, precioElement);

        return { divAgrupadora, botonAgregar, botonSumar, botonRestar, stockElement, precioElement, cantidadSeleccionadaElement, divBotonesCarrito };
    }
}