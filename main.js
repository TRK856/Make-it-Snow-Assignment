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
let moveX = randomDec(-1,1)

// event listener
document.addEventListener("keydown", keydownHandler);

// start drawing loop
requestAnimationFrame(drawSnows);

// litterally copied the bubbles array and made some changes and improvements
function createRandomSnowArray(total){
    let temp = [];
    for(let n = 1; n <= total; n++){
        temp.push(newRandomSnow());
    }
    return temp;
}

function newSnow(initX, initY, initS, initO, initI, initColor){
    return{
        x:initX,
        y:initY,
        s:initS,
        o:initO,
        i:initI,
        color:initColor
    }
}

// changed the function tot he function i made in the draw functions assigmnet
function drawSnow(aSnow){
    stroke(aSnow.color)
    fill(aSnow.color)
    drawAStar(aSnow.x, aSnow.y, aSnow.s, aSnow.o, aSnow.i, [true, true])
}

// changed the function so that x wouldn't be constantly being changed when drawsnows function is ran
function moveSnow(aSnow, [moveX, moveY], intiX){
    if(moveX === true){
        aSnow.x += intiX;
    } else if (moveY === true){
        aSnow.y += 1;
    }
}

// added a layer function, changing the size to add a sense of depth (nothing to crazy)
function newRandomSnow(){
    let layer = randomInt(0, 5)
    if(layer === 4){
        return{
            x:randomInt(-20, cnv.width),
            y:0,
            s:randomInt(6, 10),
            o:randomInt(7,10),
            i:randomInt(3,5),
            color:"white"
        };
    }  else if (layer === 3){
        return{
            x:randomInt(0, cnv.width),
            y:0,
            s:randomInt(6, 10),
            o:randomInt(4, 7),
            i:randomInt(1,3),
            color:"#d3d3d3"
        }
    }  else if (layer === 2){
        return{
            x:randomInt(0, cnv.width),
            y:0,
            s:randomInt(6, 10),
            o:randomInt(4, 7),
            i:randomInt(1,3),
            color:"#979291"
        }
    }  else {
        return{
            x:randomInt(0, cnv.width),
            y:0,
            s:randomInt(6, 10),
            o:randomInt(1,4),
            i:0,
            color:"625A59"
        }
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
    background("black")

    for(let i = 0; i < Snows.length; i++){
        moveSnow(Snows[i], [false, true]);
        if (Snows[i].y > cnv.height + 10){
            Snows[i].y = -10;
        }
        moveSnow(Snows[i], [true, false], moveX)
        if (Snows[i].x > cnv.width + 5){
            Snows[i].x = -4;
        } else if (Snows[i].x === -5){
            Snows[i].x = cnv.width + 4;
        }
        drawSnow(Snows[i]);
    }
    requestAnimationFrame(drawSnows);
}

function addSnow() {
    Snows.push(newRandomSnow());
}