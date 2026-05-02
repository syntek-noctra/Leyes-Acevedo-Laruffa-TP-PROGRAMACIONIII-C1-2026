/* VARIABLES PRINCIPALES*/

const registerBtn=document.querySelector(".button-enter");

/**
 * @type {HTMLInputElement}
 * 
 */
const userInput=document.getElementById("user-input");

let hayError=false;

const MIN_LOGIN = 4;

const KEY_USER_LOCAL = "userLocal"
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

    

registerBtn.addEventListener("click",(ev)=>{
    console.log("ASDDAS");
    ev.preventDefault();
    
    
    const userName=userInput.value;

    if(userName.length< MIN_LOGIN && !hayError){
        const p=createError("invalid name")
        userInput.parentElement.appendChild(p);
        p.style.position = "fixed"
        p.style.left = "1055px"
        hayError=true;
    }

    if(hayError) return;
    console.log("-----------------")

    const user={name:userName}

    localStorage.setItem(KEY_USER_LOCAL,JSON.stringify(user));
    window.location.href = "productos.html";

    
});
