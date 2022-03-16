// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;


// let it snow assignment
// define array
let Snows = [];

// automatically add snow
setInterval(addSnow, 1000)

// slanted snow effect
let moveX = randomDec(-1,1); 
let moveY = randomDec(1,5);

// event listener
document.addEventListener("keydown", keydownHandler);

// start drawing loop
requestAnimationFrame(drawSnows);