const temaGuardado = localStorage.getItem("tema") || "oscuro";
document.documentElement.setAttribute("data-theme", temaGuardado);


// Función para cambiar tema
function cambiarTema() {
    const html = document.querySelector("html");
    const temaActual = html.getAttribute("data-theme");

    if (temaActual === "claro") {
        html.setAttribute("data-theme", "oscuro");
        localStorage.setItem("tema", "oscuro");
    } else {
        html.setAttribute("data-theme", "claro");
        localStorage.setItem("tema", "claro");
    }
}