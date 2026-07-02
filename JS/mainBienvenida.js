import CONFIG from "./config.js";

/*===VARIABLES Y CONSTANTES PRINCIPALES===*/
const registerBtn=document.querySelector(".button-enter");
/**
 * @type {HTMLInputElement}
 * 
 */
const userInput=document.getElementById("user-input");
const MIN_LOGIN = 4;
const KEY_USER_LOCAL = "userLocal"

let hayError=false;
/*========================================*/

/*======FUNCIÓN DE CREACION DE ERROR======*/
/**
 * 
 * @param {string} mensaje  Mensaje de error brindado por el sistema.
 * @returns {HTMLParagraphElement} texto de error
 */
function createError(mensaje){
    const p=document.createElement("p");
    p.classList.add("error");
    p.textContent=mensaje;
    return p;
}
/*========================================*/
    

/*=======CAPTURA DE CLICk EN BOTÓN=======*/
registerBtn.addEventListener("click",(ev)=>{

    ev.preventDefault();
    
    const userName=userInput.value;

    if(userName.length < MIN_LOGIN){
        const p=createError("INVALID DATA");
        userInput.parentElement.appendChild(p);
        p.style.position = "fixed";
        p.style.left = "1055px";
        hayError=true;
        return;
    }
    else{

        const user={name:userName}

        localStorage.setItem(KEY_USER_LOCAL,JSON.stringify(user));
        window.location.href = "productos.html";

    }
});

document.getElementById("btnAdmin").addEventListener("click",()=>{
       window.location.href = CONFIG.API_URL + "/admin/login";
})
/*========================================*/