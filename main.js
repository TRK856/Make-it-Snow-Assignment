// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;

document.addEventListener("keydown", keydownHandler)

function keydownHandler(event) {
    if (event.keyCode === 39) {
        bubbles.push(newRandomBubble());
    } else if (event.keyCode === 37) {
        bubbles.pop();
    }
}

function background(color){
    fill(color);
    rect(0, 0, cnv.width, cnv.height, "fill")
}

let bubbles = [];

requestAnimationFrame(draw);
function draw(){
    background("pink")

    for(let i = 0; i < bubbles.length; i++){
        moveBubble(bubbles[i]);
        drawBubble(bubbles[i]);
    }
    requestAnimationFrame(draw);
}

setInterval(addBubble, 1000)

function