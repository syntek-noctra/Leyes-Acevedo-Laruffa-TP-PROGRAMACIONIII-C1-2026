const registerBtn=document.querySelector(".button-start");

/**
 * @type {HTMLInputElement}
 * 
 */
const userInput=document.getElementById("user-input");


function createError(mensaje){
    const p=document.createElement("p");
    p.classList.add("error");
    p.textContent=mensaje;
    return p;
}


registerBtn.addEventListener("click",(ev)=>{
    console.log("ASDDAS");
    ev.preventDefault();
    let hayError=false;
    
    const userName=userInput.value;

    if(userName.length<4){
        const p=createError("invalid name")
        userInput.parentElement.appendChild(p);
        hayError=true;
    }

    if(hayError) return;
    console.log("-----------------")

    const user={name:userName}

    localStorage.setItem("userLocal",JSON.stringify(user));

    
});
