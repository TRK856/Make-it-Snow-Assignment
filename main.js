// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;


let Snows = {starCenterX: 220, starCenterY: 220, numberOfSpikes: 10, outerDepth: 5, innerDepth: 0, strokeFill: [false, true]};
document.addEventListener("keydown", keydownHandler)

Snows = [];

requestAnimationFrame(drawSnow);

setInterval(addSnow, 1000)

function createRandomSnowArray(total){
    let temp = [];
    for(let n = 1; n <= total; n++){
        temp.push(newRandomSnow());
    }
    return temp;
}

function newSnow(initX, initY, initR, initColor){
    return{
        x:initX,
        y:initY,
        r:initR,
        color:initColor
    }
}

function drawSnow(aSnow){
    stroke(aSnow.color)
    circle(aSnow.x, aSnow.y, aSnow.r, "stroke")
}

function moveSnow(aSnow){
    aSnow.x += randomInt(-2, 3);
    aSnow.y += randomInt(-2, 3);
}

function newRandomSnow(initX, initY, initR, initColor){
    return{
        x:randomInt(0, cnv.width),
        y:randomInt(0, cnv.height),
        r:randomInt(5, 35),
        color:randomRGB()
    }
}

function keydownHandler(event) {
    if (event.keyCode === 39) {
        addSnow()
    } else if (event.keyCode === 37) {
        Snows.pop();
    }
}

function background(color){
    fill(color);
    rect(0, 0, cnv.width, cnv.height, "fill")
}

function drawSnows(){
    background("pink")

    for(let i = 0; i < Snows.length; i++){
        moveSnow(Snows[i]);
        drawSnow(Snows[i]);
    }
    requestAnimationFrame(drawSnows);
}

function addSnow() {
    Snows.push(newRandomSnow());
}