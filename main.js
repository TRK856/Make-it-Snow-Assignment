// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;


// let it snow assignment
// litterally copied the bubbles array's and functions and made some changes and improvements
// define array
let Snows = [];

// automatically add snow
setInterval(addSnow, 1000)

// event listener
document.addEventListener("keydown", keydownHandler);

// start drawing loop
requestAnimationFrame(drawSnows);