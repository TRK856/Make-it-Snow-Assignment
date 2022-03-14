// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;

let Snows = [];


setInterval(addSnow, 1000)

document.addEventListener("keydown", keydownHandler);

requestAnimationFrame(drawSnows);

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

function drawSnow(aSnow){
    stroke(aSnow.color)
    fill(aSnow.color)
    drawAStar(aSnow.x, aSnow.y, aSnow.s, aSnow.o, aSnow.i, [true, true])
}

function moveSnow(aSnow, [moveX, moveY], interval, repeatedInterval){
    if(moveX === true){
        for(let i = 0; i <= repeatedInterval; i++){
            aSnow.x += interval;
            setTimeout(1000)
        }
    } else if (moveY === true){
        aSnow.y += 1;
    }
}

function newRandomSnow(){
    let layer = randomInt(-1, 4)
    if(layer === 4){
        return{
            x:randomInt(-20, cnv.width),
            y:0,
            s:randomInt(6, 10),
            o:randomInt(7,10),
            i:randomInt(3,5),
            color:"white"
        }
    }  else if (layer === 2 || layer === 3){
        return{
            x:randomInt(0, cnv.width),
            y:0,
            s:randomInt(6, 10),
            o:randomInt(4, 7),
            i:randomInt(1,3),
            color:"white"
        }
    }  else {
        return{
            x:randomInt(0, cnv.width),
            y:0,
            s:randomInt(6, 10),
            o:randomInt(1,4),
            i:0,
            color:"white"
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
        if (Snows[i].y > cnv.height){
            Snows[i].y = 0;
        }
        drawSnow(Snows[i]);
    }
    requestAnimationFrame(drawSnows);
}

setInterval(() => {
    for(let i = 0; i < Snows.length; i++){
        moveSnow(Snows[i], [true, false], randomInt(-1,5), randomInt(0,10))
        drawSnow(Snows[i]);
        setTimeout(1000)
    }
}, 1000)

function addSnow() {
    Snows.push(newRandomSnow());
}