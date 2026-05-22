const imgSimbolsAsides = [
    "/IMAGES/Asides_Products_G.R.I.D.png",
    "/IMAGES/Asides_Products_G.R.I.D Inverted.png",
];
const leftSimbols = document.querySelector("#aside-simbols-left");
const rightSimbols = document.querySelector("#aside-simbols-right");


let indexSimbols = 0;

setInterval(() => {

    leftSimbols.src = imgSimbolsAsides[indexSimbols];
    rightSimbols.src = imgSimbolsAsides[indexSimbols];

    indexSimbols++;

    if(indexSimbols >= imgSimbolsAsides.length){
        indexSimbols = 0;
    }

}, 1000);